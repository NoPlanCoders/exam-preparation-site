import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const built = await build({
  bundle: true,
  entryPoints: [path.join(root, 'src/quiz-session.ts')],
  format: 'esm',
  logLevel: 'silent',
  target: 'es2020',
  write: false,
});
const { parseSavedSession, decideStartup, hashText, isPermutation, SESSION_MAX_AGE_MS } = await import(
  `data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`
);

const NOW = 1_800_000_000_000;
const valid = () => ({
  version: 1,
  savedAt: NOW - 1000,
  examId: 'quiz',
  examName: '小テスト',
  subjectId: 'software-engineering-choice',
  subjectName: 'ソフトウェア工学(選択式)',
  items: [
    { orig: 3, order: [2, 0, 1, 3], hash: 'abc' },
    { orig: 7, order: null, hash: 'def' },
  ],
  queue: [0, 1, 0],
  wrong: [0],
  masteryRemaining: [0, 1],
  index: 1,
  score: 0,
  answered: false,
  masteryMode: true,
  masteryTotal: 2,
  masteryRecorded: false,
  view: 'quiz',
});
const parse = (obj, now = NOW) => parseSavedSession(JSON.stringify(obj), now);

test('正しい保存データはそのまま読める', () => {
  assert.deepEqual(parse(valid()), valid());
});

test('空・壊れたJSON・オブジェクトでないものは再開しない', () => {
  assert.equal(parseSavedSession(null, NOW), null);
  assert.equal(parseSavedSession('', NOW), null);
  assert.equal(parseSavedSession('{broken', NOW), null);
  assert.equal(parseSavedSession('[]', NOW), null);
  assert.equal(parseSavedSession('123', NOW), null);
});

test('バージョン違い・古すぎる・未来すぎる保存データは再開しない', () => {
  assert.equal(parse({ ...valid(), version: 2 }), null);
  assert.equal(parse({ ...valid(), savedAt: NOW - SESSION_MAX_AGE_MS - 1 }), null);
  assert.ok(parse({ ...valid(), savedAt: NOW - SESSION_MAX_AGE_MS + 1000 }));
  assert.equal(parse({ ...valid(), savedAt: NOW + 10 * 60 * 1000 }), null);
});

test('設問番号が範囲外、または項目が欠けていたら再開しない', () => {
  assert.equal(parse({ ...valid(), queue: [0, 2] }), null);
  assert.equal(parse({ ...valid(), queue: [] }), null);
  assert.equal(parse({ ...valid(), wrong: [-1] }), null);
  assert.equal(parse({ ...valid(), masteryRemaining: [5] }), null);
  assert.equal(parse({ ...valid(), index: 4 }), null);
  assert.equal(parse({ ...valid(), items: [] }), null);
  assert.equal(parse({ ...valid(), items: [{ orig: 1, hash: 'x' }] }), null);
  assert.equal(parse({ ...valid(), items: [{ orig: 1, order: [0, 5], hash: 'x' }] }), null);
  assert.equal(parse({ ...valid(), examId: '' }), null);
  assert.equal(parse({ ...valid(), view: 'other' }), null);
  assert.equal(parse({ ...valid(), score: 1.5 }), null);
});

test('全問正解モードかどうかと、未クリアの設問の一覧が食い違っていたら再開しない', () => {
  assert.equal(parse({ ...valid(), masteryMode: false }), null);
  assert.equal(parse({ ...valid(), masteryRemaining: null }), null);
  const normal = { ...valid(), masteryMode: false, masteryRemaining: null };
  assert.ok(parse(normal));
});

test('結果画面(index が出題数と同じ)も保存できる', () => {
  const result = { ...valid(), view: 'result', index: 3 };
  assert.equal(parse(result).view, 'result');
});

test('起動時の判断: 更新では保存データを優先し、新しく開いたリンクはリンクを優先する', () => {
  const d = (hasSaved, hasLink, navigationType) => decideStartup({ hasSaved, hasLink, navigationType });
  // 更新 / 戻る・進む
  assert.equal(d(true, true, 'reload'), 'restore');
  assert.equal(d(true, false, 'reload'), 'restore');
  assert.equal(d(true, true, 'back_forward'), 'restore');
  assert.equal(d(false, true, 'reload'), 'link');
  // 新しく開いた(リンクのクリック・URL入力・PWAの起動)
  assert.equal(d(true, true, 'navigate'), 'link');
  assert.equal(d(true, false, 'navigate'), 'restore');
  assert.equal(d(false, true, 'navigate'), 'link');
  assert.equal(d(false, false, 'navigate'), 'library');
  assert.equal(d(false, false, 'reload'), 'library');
});

test('hashText は同じ文字列なら同じ値、違う文字列なら(ほぼ)違う値', () => {
  assert.equal(hashText('ソフトウェア工学'), hashText('ソフトウェア工学'));
  assert.notEqual(hashText('A'), hashText('B'));
  assert.notEqual(hashText('問題1'), hashText('問題2'));
});

test('isPermutation は欠け・重複・長さ違いを弾く', () => {
  assert.equal(isPermutation([2, 0, 1, 3], 4), true);
  assert.equal(isPermutation([0, 0, 1, 2], 4), false);
  assert.equal(isPermutation([0, 1, 2], 4), false);
  assert.equal(isPermutation([0, 1, 2, 4], 4), false);
});
