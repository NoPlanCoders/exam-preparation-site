import type { Subject } from '../../types.js';
import subjectTypes from './subject-types.json';

// 「4I 前期期末試験」の科目一覧。
// 新しい科目を追加するときは、このフォルダに xxx.ts を作成して問題配列を書き、
// src/data/registry.ts に import と登録を追加し、ここにも1件追加する。
// icon は src/icons.ts の ICONS に定義されたキー名を指定する。
//
// 履修科目(通常の科目一覧に表示される)か選択科目(メニューの「選択科目を追加」で
// 検索してピン留めしたときだけ表示される)かは、同じフォルダの subject-types.json に記入する。
const rawSubjects: Subject[] = [
  {
    id: 'database-choice',
    name: 'データベース(選択式)',
    description: '関係表・関係代数・SQLの用語を4択で確認',
    icon: 'database',
  },
  {
    id: 'database-text',
    name: 'データベース(記述式)',
    description: '関係表・関係代数・SQLの用語を入力して確認',
    icon: 'keyboard',
  },
  {
    id: 'game-theory-choice',
    name: 'ゲーム理論(選択式)',
    description: 'ナッシュ均衡・支配関係・混合戦略などを4択で確認',
    icon: 'dice',
  },
  {
    id: 'game-theory-text',
    name: 'ゲーム理論(記述式)',
    description: 'ナッシュ均衡・支配関係・混合戦略などを入力して確認',
    icon: 'brain',
  },
  {
    id: 'game-theory-handwriting',
    name: 'ゲーム理論(計算・手書き)',
    description: '利得行列やクールノー・ベルトラン競争の計算問題を手書きで解いて確認',
    icon: 'pencil',
  },
  {
    id: 'mechatronics-choice',
    name: 'メカトロニクス(選択式)',
    description: 'センサ・アクチュエータから半導体、論理回路、オペアンプまでを4択で確認',
    icon: 'wrench',
  },
  {
    id: 'mechatronics-text',
    name: 'メカトロニクス(記述式)',
    description: 'センサ・アクチュエータから半導体、論理回路、オペアンプまでを入力して確認',
    icon: 'bolt',
  },
  {
    id: 'data-structures-choice',
    name: 'データ構造とアルゴリズム(選択式)',
    description: 'スタック・キュー・木構造・整列法などを4択で確認',
    icon: 'tree',
  },
  {
    id: 'data-structures-text',
    name: 'データ構造とアルゴリズム(記述式)',
    description: 'スタック・キュー・木構造・整列法などを入力して確認',
    icon: 'book',
  },
  {
    id: 'os-choice',
    name: 'オペレーティングシステム(選択式)',
    description: 'プロセス管理・同期制御・メモリ管理・ファイルシステムを4択で確認',
    icon: 'save',
  },
  {
    id: 'os-text',
    name: 'オペレーティングシステム(記述式)',
    description: 'プロセス管理・同期制御・メモリ管理・ファイルシステムを入力して確認',
    icon: 'monitor',
  },
  {
    id: 'numerical-methods-choice',
    name: '数値計算法(選択式)',
    description: '置換・Hallの結婚定理・グラフの連結性・写像・ベイズの定理などを4択で確認',
    icon: 'network',
  },
  {
    id: 'numerical-methods-text',
    name: '数値計算法(記述式)',
    description: '置換・Hallの結婚定理・グラフの連結性・写像・ベイズの定理などを入力して確認',
    icon: 'calculator',
  },
  {
    id: 'numerical-methods-handwriting',
    name: '数値計算法(計算・手書き)',
    description:
      '置換の計算・隣接行列の累乗・ベイズの定理・不定方程式・ダイクストラ法・ユークリッドの互除法などの計算問題を手書きで解いて確認',
    icon: 'matrix',
  },
  {
    id: 'control-engineering-choice',
    name: '制御工学(選択式)',
    description: '複素数・ラプラス変換・周波数伝達関数・安定判別などを4択で確認',
    icon: 'gauge',
  },
  {
    id: 'control-engineering-text',
    name: '制御工学(記述式)',
    description: '複素数・ラプラス変換・周波数伝達関数・安定判別などを入力して確認',
    icon: 'wave',
  },
  {
    id: 'control-engineering-handwriting',
    name: '制御工学(計算・手書き)',
    description: '複素数計算・部分分数分解・ラプラス変換・ラウスの安定判別法などの計算問題を手書きで解いて確認',
    icon: 'target',
  },
  {
    id: 'korean-choice',
    name: '韓国語(選択式)',
    description:
      '有声音化・連音化・濃音化・激音化、かなのハングル表記、漢数詞、位置を表す名詞などを4択で確認',
    icon: 'languages',
  },
  {
    id: 'economics-choice',
    name: '経済学(選択式)',
    description:
      '需要供給曲線のシフト・企業の形態・余剰分析・不完全競争と市場の失敗・ゲーム理論などを公務員試験形式(5択)で確認',
    icon: 'trending-up',
  },
  {
    id: 'economics-handwriting',
    name: '経済学(計算・手書き)',
    description: '費用関数(損益分岐点・操業停止価格)、租税負担割合、消費者余剰・生産者余剰の計算問題を手書きで解いて確認',
    icon: 'calculator',
  },
];

const electiveIds = new Set<string>(subjectTypes['選択科目']);

export const subjects: Subject[] = rawSubjects.map((subject) => ({
  ...subject,
  category: electiveIds.has(subject.id) ? '選択科目' : '履修科目',
}));
