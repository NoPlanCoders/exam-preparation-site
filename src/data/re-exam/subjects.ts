import type { Subject } from '../../types.js';

// 問題は内容が決まり次第追加する。
export const subjects: Subject[] = [
  { id: 'japanese', name: '国語', description: '問題はまだ登録されていません', icon: 'scroll' },
  { id: 'english-choice', name: '英語(選択式)', description: '再試験対策の選択問題', icon: 'book-a' },
  { id: 'english-order', name: '英語(並び替え・記述式)', description: '再試験対策の並び替え問題', icon: 'keyboard' },
  { id: 'database-text', name: 'データベース(記述式)', description: '正規形の判別・関数従属・SQLを記述式で確認', icon: 'database' },
  { id: 'data-structures-text', name: 'データ構造とアルゴリズム(記述式)', description: 'プログラムの追跡・データ構造・整列を記述式で確認', icon: 'tree' },
];
