<p align="center">
  <img src="public/icons/icon-512.png" alt="テスト対策クイズのアイコン" width="144" />
</p>

<h1 align="center">テスト対策用クイズサイト</h1>

<p align="center">
  教科ごとの問題を、すきま時間にくり返し解ける学習用クイズアプリです。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/PWA-ready-6366F1?logo=pwa&logoColor=white" alt="PWA ready" />
  <img src="https://img.shields.io/badge/education-purpose-22C55E" alt="教育目的" />
</p>

## ✨ できること

- **教科ごとに整理** — 試験の中から教科を選び、問題形式を確認してスタート
- **ライブラリとダッシュボード** — 問題を探す場所と学習状況を確認する場所を分離
- **複数の出題形式** — 選択式・記述式・計算・手書きに対応
- **問題数を自由に選択** — 短時間の確認からまとめ演習まで切り替え可能
- **全問正解モード** — 不正解の問題だけをくり返し、全問正解まで集中演習（手書きは答えを確認するまで）
- **設定を保存** — 設定画面からダークモードを切り替え、次回も同じテーマで利用
- **PWA対応** — 対応ブラウザではホーム画面に追加してアプリ感覚で利用可能
- **スマートフォン対応** — モバイルでも操作しやすいレスポンシブUI

## 🚀 はじめ方

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開いてください。

## 🧰 npm scripts

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動し、変更を監視 |
| `npm run build` | 型チェックと本番用バンドルを生成 |
| `npm run watch` | バンドルを監視して自動更新 |
| `npm run deploy` | Vercelへ本番デプロイ |

## 🗂️ プロジェクト構成

```text
src/
├─ app.ts                 # アプリの画面遷移と状態管理
├─ icons.ts               # アイコン定義
├─ types.ts               # データ型
├─ main.ts                # エントリーポイント
└─ data/                  # 試験・教科・問題データ
public/
├─ index.html             # クイズ画面
├─ create.html            # クイズ作成ツール
├─ manifest.webmanifest   # PWA設定
├─ sw.js                  # オフラインキャッシュ
└─ icons/                 # favicon・PWA・OGP用アイコン
```

## ➕ 問題を追加する

問題データの追加方法は [ADDING_QUIZZES.md](ADDING_QUIZZES.md) にまとめています。

新しい問題を追加したら、型チェックを兼ねてビルドしてください。

```bash
npm run build
```

## 📱 PWA・シェア用メタデータ

`public/manifest.webmanifest` とサービスワーカーを利用してPWAとしてインストールできます。
ページにはfavicon、Apple touch icon、Open Graph、Twitter Card用のメタデータも設定済みです。

## 📄 ライセンス

学校のテスト対策を目的とした個人開発プロジェクトです。
