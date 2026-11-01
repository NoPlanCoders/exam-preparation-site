import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryBuild = await build({
  bundle: true,
  entryPoints: [path.join(root, 'src/data/registry.ts')],
  format: 'esm',
  logLevel: 'silent',
  platform: 'node',
  target: 'es2020',
  write: false,
});
const registry = await import(
  `data:text/javascript;base64,${Buffer.from(registryBuild.outputFiles[0].text).toString('base64')}`,
);
const scheduleBuild = await build({
  bundle: true,
  entryPoints: [path.join(root, 'src/schedule.ts')],
  format: 'esm',
  logLevel: 'silent',
  platform: 'node',
  target: 'es2020',
  write: false,
});
const schedule = await import(
  `data:text/javascript;base64,${Buffer.from(scheduleBuild.outputFiles[0].text).toString('base64')}`,
);

function assertUnique(values, label) {
  assert.equal(new Set(values).size, values.length, `${label} が重複しています`);
}

test('試験・科目・問題の登録が一貫している', () => {
  const exams = registry.getExams();
  assert.ok(exams.length > 0, '試験が1件以上必要です');
  assertUnique(exams.map((exam) => exam.id), '試験ID');

  for (const exam of exams) {
    assert.ok(exam.id.trim(), '試験IDが空です');
    assert.ok(exam.name.trim(), `${exam.id} の試験名が空です`);

    const subjects = registry.getSubjects(exam.id);
    assertUnique(subjects.map((subject) => subject.id), `${exam.id} の科目ID`);

    for (const subject of subjects) {
      assert.ok(subject.id.trim(), '科目IDが空です');
      assert.ok(subject.name.trim(), `${subject.id} の科目名が空です`);

      const questions = registry.getQuestions(exam.id, subject.id);
      for (const question of questions) {
        assert.ok(question.question.trim(), `${subject.id} に問題文が空の問題があります`);

        if (question.type === 'choice') {
          assert.ok(question.choices.length >= 2, `${subject.id} の選択肢が不足しています`);
          assert.ok(
            Number.isInteger(question.answer) &&
              question.answer >= 0 &&
              question.answer < question.choices.length,
            `${subject.id} の正解番号が選択肢の範囲外です`,
          );
          continue;
        }

        if (question.type === 'text') {
          const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
          assert.ok(answers.length > 0 && answers.every((answer) => answer.trim()), `${subject.id} の記述式の正解が空です`);
          continue;
        }

        assert.equal(question.type, 'handwriting', `${subject.id} の問題形式が不正です`);
        assert.ok(question.answer.trim(), `${subject.id} の手書き問題の正解が空です`);
      }
    }
  }
});

test('存在しない試験・科目は空配列を返す', () => {
  assert.deepEqual(registry.getSubjects('missing-exam'), []);
  assert.deepEqual(registry.getQuestions('missing-exam', 'missing-subject'), []);
});

test('再試験の科目と日程を、問題が未登録でも確認できる', () => {
  assert.deepEqual(registry.getSubjects('re-exam').map((subject) => subject.name), [
    '国語', '英語(選択式)', '英語(並び替え・記述式)', 'データベース(記述式)', 'データ構造とアルゴリズム(記述式)',
  ]);
  const examSchedule = schedule.getExamSchedule('re-exam');
  assert.equal(examSchedule.year, 2026);
  assert.deepEqual(examSchedule.days.map((day) => [day.month, day.day, day.periods[0].subject]), [
    [11, 4, '国語'], [11, 14, 'データベース'], [11, 28, 'データ構造とアルゴリズム'],
  ]);
});

test('再試験のデータベースは記述式問題を含む', () => {
  const questions = registry.getQuestions('re-exam', 'database-text');
  assert.ok(questions.length >= 100);
  assert.ok(questions.every((question) => question.type === 'text'));
  assertUnique(questions.map((question) => question.question), 'データベースの問題文');
});

test('再試験のデータ構造は100問以上の重複しない記述式問題を含む', () => {
  const questions = registry.getQuestions('re-exam', 'data-structures-text');
  assert.ok(questions.length >= 100);
  assert.ok(questions.every((question) => question.type === 'text'));
  assertUnique(questions.map((question) => question.question), 'データ構造の問題文');
});

test('再試験の英語は選択問題と並び替え問題を各20問含む', () => {
  const choices = registry.getQuestions('re-exam', 'english-choice');
  const ordering = registry.getQuestions('re-exam', 'english-order');
  assert.equal(choices.length, 20);
  assert.equal(ordering.length, 20);
  assert.ok(choices.every((question) => question.type === 'choice'));
  assert.ok(ordering.every((question) => question.type === 'text'));
});
