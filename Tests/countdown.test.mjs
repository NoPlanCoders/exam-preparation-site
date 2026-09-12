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

// このテストは src/schedule.ts に実際に登録されている
// '4i-zenki-kimatsu' の試験期間(2026年9月15日(火)〜19日(土))を前提にしている。
// 日程データ自体を更新した場合は、このテストの日付も合わせて更新すること。

test('試験開始前は、開始日時までの時間と日数を計算する(before)', () => {
  // 9/14 0:00 → 9/15 0:00 まで、ちょうど24時間・1日前。
  const result = countdown.getTestCountdown(new Date(2026, 8, 14, 0, 0, 0));

  assert.equal(result.phase, 'before');
  assert.equal(result.hours, 24);
  assert.equal(result.days, 1);
  assert.equal(result.target.getFullYear(), 2026);
  assert.equal(result.target.getMonth(), 8);
  assert.equal(result.target.getDate(), 15);
  assert.equal(result.examId, '4i-zenki-kimatsu');
});

test('試験期間が始まったら、終了日時までのカウントダウンに切り替わる(during)', () => {
  // 期間初日の途中(9/15 10:00)。開始日ではなく終了日(9/19 23:59:59)がtargetになる。
  const result = countdown.getTestCountdown(new Date(2026, 8, 15, 10, 0, 0));

  assert.equal(result.phase, 'during');
  assert.equal(result.target.getFullYear(), 2026);
  assert.equal(result.target.getMonth(), 8);
  assert.equal(result.target.getDate(), 19);
  assert.ok(result.hours > 0);
  assert.ok(result.days >= 0);
});

test('試験期間の最終日も、その日の終わりまでは期間中(during)として扱われる', () => {
  // 最終日(9/19)の朝。まだ終了日時(23:59:59)を過ぎていないのでduring。
  const result = countdown.getTestCountdown(new Date(2026, 8, 19, 9, 0, 0));

  assert.equal(result.phase, 'during');
  assert.equal(result.target.getDate(), 19);
  assert.ok(result.hours > 0);
});

test('登録されている試験がすべて終わったら none になる(次の試験が登録されるまで)', () => {
  // 十分未来の日付。schedule.tsに他の試験が追加されていない前提での確認。
  const result = countdown.getTestCountdown(new Date(2099, 0, 1, 0, 0, 0));

  assert.equal(result.phase, 'none');
  assert.equal(result.hours, 0);
  assert.equal(result.days, 0);
});
