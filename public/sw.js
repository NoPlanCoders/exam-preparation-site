const CACHE_NAME = 'quiz-app-v50';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/bundle.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
// ネットワークがこの時間内に応答しないときは、キャッシュ済みのものを先に返す。
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// ネットワーク優先(オンラインなら常に最新を使い、オフラインのときだけキャッシュを使う)。
// キャッシュ優先だと、デプロイ後も古いbundle.jsが使われ続けて新機能が動かないため。
// ページ移動(navigate)は ?exam=...&subject=... のようなクエリ付きURL(クイズへの直リンク)でも
// 同じ index.html として扱う。
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  const cacheKey = request.mode === 'navigate' ? new Request('./index.html') : request;
  event.respondWith(networkFirst(event, request, cacheKey));
});

async function networkFirst(event, request, cacheKey) {
  const cache = await caches.open(CACHE_NAME);

  const network = fetch(request).then((response) => {
    if (response.ok && response.type === 'basic') {
      event.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  });
  // タイムアウトでキャッシュを返した後にネットワークが失敗しても、未処理のエラーにしない。
  network.catch(() => {});

  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('network timeout')), NETWORK_TIMEOUT_MS);
  });

  try {
    return await Promise.race([network, timeout]);
  } catch {
    const cached = await cache.match(cacheKey, { ignoreSearch: true });
    // キャッシュがなければ、時間がかかっていてもネットワークの結果を待つ(失敗ならそのままエラー)。
    return cached ?? network;
  } finally {
    clearTimeout(timer);
  }
}
