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
    assert.ok(subjects.length > 0, `${exam.id} に科目がありません`);
    assertUnique(subjects.map((subject) => subject.id), `${exam.id} の科目ID`);

    for (const subject of subjects) {
      assert.ok(subject.id.trim(), '科目IDが空です');
      assert.ok(subject.name.trim(), `${subject.id} の科目名が空です`);

      const questions = registry.getQuestions(exam.id, subject.id);
      assert.ok(questions.length > 0, `${exam.id}/${subject.id} に問題がありません`);

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
