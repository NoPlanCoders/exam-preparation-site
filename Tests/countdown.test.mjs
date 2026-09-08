import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const countdownBuild = await build({
  bundle: true,
  entryPoints: [path.join(root, 'src/countdown.ts')],
  format: 'esm',
  logLevel: 'silent',
  target: 'es2020',
  write: false,
});
const countdown = await import(
  `data:text/javascript;base64,${Buffer.from(countdownBuild.outputFiles[0].text).toString('base64')}`,
);

test('次回9月19日までの時間と日数を計算する', () => {
  const result = countdown.getTestCountdown(new Date(2027, 8, 18, 0, 0, 0));

  assert.equal(result.hours, 24);
  assert.equal(result.days, 1);
  assert.equal(result.target.getFullYear(), 2027);
  assert.equal(result.target.getMonth(), 8);
  assert.equal(result.target.getDate(), 19);
});

test('9月19日を過ぎたら翌年を対象にする', () => {
  const result = countdown.getTestCountdown(new Date(2027, 8, 20, 0, 0, 0));

  assert.equal(result.target.getFullYear(), 2028);
  assert.equal(result.target.getMonth(), 8);
  assert.equal(result.target.getDate(), 19);
  assert.ok(result.hours > 0);
  assert.ok(result.days > 0);
});
