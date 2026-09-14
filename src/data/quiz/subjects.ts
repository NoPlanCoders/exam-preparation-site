import type { Subject } from '../../types.js';
import subjectTypes from './subject-types.json';

// 「小テスト」の科目一覧。
// 新しい科目を追加するときは、このフォルダに xxx.ts を作成して問題配列を書き、
// src/data/registry.ts に import と登録を追加し、ここにも1件追加する。
// icon は src/icons.ts の ICONS に定義されたキー名を指定する。
//
// 履修科目(通常の科目一覧に表示される)か選択科目(メニューの「選択科目を追加」で
// 検索してピン留めしたときだけ表示される)かは、同じフォルダの subject-types.json に記入する。
const rawSubjects: Subject[] = [
  
];

const electiveIds = new Set<string>(subjectTypes['選択科目']);

export const subjects: Subject[] = rawSubjects.map((subject) => ({
  ...subject,
  category: electiveIds.has(subject.id) ? '選択科目' : '履修科目',
}));