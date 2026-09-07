# クイズの追加方法

このサイトのデータは `src/data/` 以下の TypeScript ファイルで管理しています。
「試験」の中に複数の「科目」があり、各科目に「問題」が並ぶ構造です。

```
src/data/
  exams.ts                    試験一覧
  registry.ts                 試験・科目・問題を結びつける登録簿
  4i-zenki-kimatsu/            試験ごとのフォルダ
    subjects.ts                その試験の科目一覧
    database-choice.ts         科目ごとの問題ファイル
    database-text.ts
```

新しいデータを追加したら、必ず最後に以下を実行してビルドし直してください。

```bash
npm run build
```

---

## 1. 既存の試験に新しい科目を追加する

例: 「4I 前期期末試験」に「情報セキュリティ」科目を追加する場合。

### ① 問題ファイルを作る

`src/data/4i-zenki-kimatsu/` に新しいファイル(例: `security.ts`)を作成する。

```ts
import type { Question } from '../../types.js';

export const questions: Question[] = [
  {
    type: 'choice',
    question: '不正アクセスを防ぐための「多要素認証」に該当しないものはどれか。',
    choices: ['パスワード', '指紋認証', 'SMS認証コード', 'ファイル名'],
    answer: 3,
  },
  {
    type: 'text',
    question: '通信を暗号化するプロトコルの略称を答えよ(HTTPの安全版)。',
    answer: ['HTTPS', 'https'],
  },
];
```

問題の書き方は [3. 問題の書き方リファレンス](#3-問題の書き方リファレンス) を参照。

### ② 科目一覧に登録する

`src/data/4i-zenki-kimatsu/subjects.ts` に1件追加する。

```ts
export const subjects: Subject[] = [
  // ...既存の科目...
  {
    id: 'security',           // ファイル名と揃える(拡張子なし)
    name: '情報セキュリティ',
    description: '不正アクセス対策や暗号化の基礎を確認',
    icon: '🔒',                // 省略可
  },
];
```

### ③ registry.ts に登録する

`src/data/registry.ts` の上部に import を1行追加し、`questions` オブジェクトに1行追加する。

```ts
import { questions as zenkiKimatsuSecurity } from './4i-zenki-kimatsu/security.js';
```

```ts
questions: {
  'database-choice': zenkiKimatsuDatabaseChoice,
  'database-text': zenkiKimatsuDatabaseText,
  'security': zenkiKimatsuSecurity, // 追加
},
```

### ④ ビルド

```bash
npm run build
```

これで科目選択画面に「情報セキュリティ」が表示されます。

---

## 2. 新しい試験を丸ごと追加する

例: 「4I 後期中間試験」を新設する場合。

1. `src/data/4i-koki-chukan/` フォルダを作る
2. その中に `subjects.ts` と科目ごとの問題ファイルを作る(書き方は上の「①②」と同じ)
3. `src/data/exams.ts` に試験情報を1件追加する

   ```ts
   export const QUIZ_EXAMS: Exam[] = [
     { id: '4i-zenki-kimatsu', name: '4I 前期期末試験', description: '...', icon: '🎓' },
     { id: '4i-koki-chukan', name: '4I 後期中間試験', description: '...', icon: '📘' }, // 追加
   ];
   ```

4. `src/data/registry.ts` に import と `examData` のエントリを1件追加する

   ```ts
   import { subjects as kokiChukanSubjects } from './4i-koki-chukan/subjects.js';
   import { questions as kokiChukanXxx } from './4i-koki-chukan/xxx.js';

   const examData: Record<string, ExamData> = {
     '4i-zenki-kimatsu': { /* 既存はそのまま */ },
     '4i-koki-chukan': {
       subjects: kokiChukanSubjects,
       questions: {
         xxx: kokiChukanXxx,
       },
     },
   };
   ```

5. `npm run build`

既存の試験・科目のファイルには一切触れなくてよいので、壊す心配はありません。

---

## 3. 問題の書き方リファレンス

問題には3つの形式があり、科目内で自由に混在させてよい。

### 選択式 (`choice`)

```ts
{
  type: 'choice',
  question: '問題文',
  choices: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
  answer: 0, // 正解の choices 配列内でのインデックス(0始まり)
}
```
- 正解の位置(`answer`)は先頭ばかりにせず、問題ごとにばらけさせるとよい。
- 任意で `explanations` を付けられる。`choices` と同じ並びの配列で、各選択肢の解説を書く。
  不正解の選択肢が選ばれたとき、その選択肢の解説(と、あれば正解の選択肢の解説)が表示される。
  解説不要の選択肢は空文字 `''` にしておく。省略すれば解説なし。
  ```ts
  {
    type: 'choice',
    question: '主キーの説明として正しいものはどれか。',
    choices: ['行を一意に識別する', 'NULL を許可する列', '必ず数値型', '複数行に重複してよい'],
    answer: 0,
    explanations: [
      '正しい。主キーは各行を一意に識別し、重複と NULL を許さない。',
      '主キーは NULL を許可しない。これは候補キー全般の話とも異なる。',
      '型は問わない。文字列や日付でも主キーにできる。',
      '主キーの値は表内で重複できない。',
    ],
  }
  ```

### 記述式 (`text`)

```ts
{
  type: 'text',
  question: '問題文',
  answer: '正解の文字列',
}
```
- 表記ゆれを許容したい場合は配列で複数指定できる(いずれかに一致すれば正解)。
  ```ts
  answer: ['正規形', '正規表'],
  ```
- 採点は前後の空白除去・大文字小文字を無視して比較する(それ以外の表記ゆれは吸収しないので、答えが一意に決まる問題向き)。

### 手書き (`handwriting`)

```ts
{
  type: 'handwriting',
  question: '「たいせつ」を漢字で書いてください',
  answer: '大切',
}
```
- 自動採点はしない。キャンバスに書いた後「答えを確認」を押すと正解が表示されるだけの自己確認形式。
- この形式だけの科目は、結果画面でスコア(正答率)を出さず「◯問を確認しました」という表示になる。

---

## 4. 動作確認の方法

`index.html` を直接ダブルクリックで開くと、ES Modules 由来の制限でスクリプトが動かないことがあるため、簡易サーバー経由で確認する。

```bash
npx http-server public -p 5173 -c-1
```

起動後、`http://localhost:5173` をブラウザで開いて確認する。
