import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(path.join(root, 'public/sw.js'), 'utf8');
const ORIGIN = 'https://example.com';

// public/sw.js を、Service Worker の代わりにモックを渡して読み込む。
function loadWorker({ fetchImpl }) {
  const listeners = {};
  const store = new Map(); // url -> Response
  const stripSearch = (url) => url.split('?')[0];
  const cache = {
    async match(req, opts = {}) {
      const url = typeof req === 'string' ? req : req.url;
      for (const [key, res] of store) {
        if (key === url || (opts.ignoreSearch && stripSearch(key) === stripSearch(url))) return res.clone();
      }
      return undefined;
    },
    async put(req, res) {
      store.set(typeof req === 'string' ? req : req.url, res);
    },
    async addAll() {},
  };
  class SWRequest extends Request {
    constructor(input, init) {
      super(typeof input === 'string' ? new URL(input, `${ORIGIN}/sw.js`).href : input, init);
    }
  }
  const context = {
    self: {
      location: new URL(`${ORIGIN}/sw.js`),
      addEventListener: (type, fn) => (listeners[type] = fn),
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches: { open: async () => cache, keys: async () => [], delete: async () => true },
    fetch: fetchImpl,
    Request: SWRequest,
    URL,
    Promise,
    Error,
    // 4秒のタイムアウトをテスト用に短縮する。
    setTimeout: (fn, ms) => setTimeout(fn, ms >= 1000 ? 20 : ms),
    clearTimeout,
  };
  vm.createContext(context);
  vm.runInContext(source, context);

  async function dispatch(request) {
    const event = {
      request,
      responded: undefined,
      pending: [],
      respondWith(p) {
        this.responded = p;
      },
      waitUntil(p) {
        this.pending.push(p);
      },
    };
    listeners.fetch(event);
    return event;
  }
  return { store, dispatch };
}

const navigate = (query = '') => {
  const req = new Request(`${ORIGIN}/${query}`);
  Object.defineProperty(req, 'mode', { value: 'navigate' });
  return req;
};
// ブラウザでは同一オリジンの応答の type は 'basic' になる(Nodeの Response は 'default')。
const okResponse = (body) => {
  const res = new Response(body, { status: 200 });
  Object.defineProperty(res, 'type', { value: 'basic' });
  return res;
};

test('オンラインなら常にネットワークの最新を返し、index.htmlとして保存する(クエリ付きURLでも)', async () => {
  const { store, dispatch } = loadWorker({ fetchImpl: async () => okResponse('fresh') });
  store.set(`${ORIGIN}/index.html`, okResponse('stale'));

  const event = await dispatch(navigate('?exam=quiz&subject=x'));
  const res = await event.responded;
  assert.equal(await res.text(), 'fresh');
  await Promise.all(event.pending);
  assert.equal(await store.get(`${ORIGIN}/index.html`).text(), 'fresh');
  assert.equal(store.size, 1, 'クエリ違いのURLごとにキャッシュが増えない');
});

test('オフラインのとき、クエリ付きURLでもキャッシュ済みのindex.htmlを返す', async () => {
  const { store, dispatch } = loadWorker({ fetchImpl: async () => { throw new TypeError('offline'); } });
  store.set(`${ORIGIN}/index.html`, okResponse('cached-index'));

  const event = await dispatch(navigate('?exam=quiz&subject=x&count=5'));
  assert.equal(await (await event.responded).text(), 'cached-index');
});

test('オフラインでキャッシュ済みのスクリプトなどの静的ファイルも返す', async () => {
  const { store, dispatch } = loadWorker({ fetchImpl: async () => { throw new TypeError('offline'); } });
  store.set(`${ORIGIN}/js/bundle.js`, okResponse('cached-bundle'));

  const event = await dispatch(new Request(`${ORIGIN}/js/bundle.js`));
  assert.equal(await (await event.responded).text(), 'cached-bundle');
});

test('オフラインでキャッシュもなければエラーになる', async () => {
  const { dispatch } = loadWorker({ fetchImpl: async () => { throw new TypeError('offline'); } });
  const event = await dispatch(new Request(`${ORIGIN}/js/other.js`));
  await assert.rejects(event.responded);
});

test('ネットワークが遅いときはタイムアウト後にキャッシュを返す', async () => {
  const { store, dispatch } = loadWorker({ fetchImpl: () => new Promise(() => {}) });
  store.set(`${ORIGIN}/index.html`, okResponse('cached-index'));

  const event = await dispatch(navigate());
  assert.equal(await (await event.responded).text(), 'cached-index');
});

test('GET以外や別オリジンのリクエストは扱わない', async () => {
  const { dispatch } = loadWorker({ fetchImpl: async () => okResponse('x') });
  assert.equal((await dispatch(new Request(`${ORIGIN}/api`, { method: 'POST' }))).responded, undefined);
  assert.equal((await dispatch(new Request('https://other.example/a.js'))).responded, undefined);
});
