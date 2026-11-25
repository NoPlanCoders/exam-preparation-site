import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Buffer } from 'node:buffer';
import { build } from 'esbuild';

const built = await build({ entryPoints: ['src/ordering.ts'], bundle: true, format: 'esm', write: false, logLevel: 'silent' });
const { isOrderingCorrect } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`);

test('並び替えは語句の順番と全ての要素の使用を確認する', () => {
  const items = ['I', 'like', 'apples'];
  assert.equal(isOrderingCorrect(items, [0, 1, 2]), true);
  assert.equal(isOrderingCorrect(items, [1, 0, 2]), false);
  assert.equal(isOrderingCorrect(items, [0, 1]), false);
  assert.equal(isOrderingCorrect(items, [0, 1, 1]), false);
  assert.equal(isOrderingCorrect(items, [0, 1, 8]), false);
});

test('同じ語句は入れ替えても正解になる', () => {
  assert.equal(isOrderingCorrect(['a', 'b', 'a'], [2, 1, 0]), true);
  assert.equal(isOrderingCorrect(['a', 'b', 'a'], [0, 2, 1]), false);
});
