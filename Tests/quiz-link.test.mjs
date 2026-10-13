import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const linkBuild = await build({
  bundle: true,
  entryPoints: [path.join(root, 'src/quiz-link.ts')],
  format: 'esm',
  logLevel: 'silent',
  target: 'es2020',
  write: false,
});
const { parseQuizLink } = await import(
  `data:text/javascript;base64,${Buffer.from(linkBuild.outputFiles[0].text).toString('base64')}`
);

test('exam指定がなければ通常表示(null)', () => {
  assert.equal(parseQuizLink(''), null);
  assert.equal(parseQuizLink('?subject=database-choice'), null);
  assert.equal(parseQuizLink('?exam='), null);
});

test('examだけなら科目一覧を開く指定になる', () => {
  assert.deepEqual(parseQuizLink('?exam=quiz'), {
    examId: 'quiz',
    subjectId: undefined,
    count: undefined,
    mastery: false,
  });
});

test('exam と subject で、全問をすぐ開始する指定になる', () => {
  const link = parseQuizLink('?exam=quiz&subject=software-engineering-choice');
  assert.equal(link.examId, 'quiz');
  assert.equal(link.subjectId, 'software-engineering-choice');
  assert.equal(link.count, undefined);
  assert.equal(link.mastery, false);
});

test('count は正の整数だけ有効。all・0・負数・小数・文字列は全問扱い', () => {
  assert.equal(parseQuizLink('?exam=a&subject=b&count=10').count, 10);
  for (const bad of ['all', '0', '-3', '2.5', 'abc', '']) {
    assert.equal(parseQuizLink(`?exam=a&subject=b&count=${bad}`).count, undefined, `count=${bad}`);
  }
});

test('mode=mastery のときだけ全問正解モードになる', () => {
  assert.equal(parseQuizLink('?exam=a&subject=b&mode=mastery').mastery, true);
  assert.equal(parseQuizLink('?exam=a&subject=b&mode=other').mastery, false);
});
