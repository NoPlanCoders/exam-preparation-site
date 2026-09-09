import type { Exam } from '../types.js';

// 試験一覧。新しい試験を追加するときは、
// 1. src/data/{examId}/ フォルダを作成
// 2. その中に subjects.ts と 科目別の問題ファイル(xxx.ts)を作成
// 3. src/data/registry.ts に import と登録を1件追加
// 4. ここに試験情報を1件追加
// するだけでOK。既存の試験データには影響しません。
// (任意) 試験日程をバーガーメニューの「試験日程」に表示したい場合は、
// src/schedule.ts の EXAM_SCHEDULES に同じ examId で1件追加する。
// 追加しなければ「試験日程」画面には未登録である旨が表示されるだけで、
// 他の機能には影響しない。
export const QUIZ_EXAMS: Exam[] = [
  {
    id: '4i-zenki-kimatsu',
    name: '4I 前期期末試験',
    description: '4Iクラス 前期期末試験の対策問題',
    icon: 'graduation-cap',
  },
];
