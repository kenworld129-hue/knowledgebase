# フロントエンド ページ一覧

## プロジェクト情報
- **フレームワーク**: Next.js 16.0.5
- **ルーティング**: App Router + Pages Router (ハイブリッド構成)
- **言語**: TypeScript

## ページ構成

### App Router (`/app` ディレクトリ)

#### メインページ
- **URL**: `/`
- **ファイル**: `/app/page.tsx`
- **機能**: ダッシュボード
- **内容**: 
  - 統計カード（総インシデント数、未解決、平均解決時間）
  - 最近のインシデント一覧テーブル
  - クイックアクションボタン

#### レイアウト
- **ファイル**: `/app/layout.tsx`
- **機能**: 全ページ共通レイアウト
- **内容**:
  - ヘッダーナビゲーション
  - メタデータ設定
  - フォント設定

#### テストページ
- **URL**: `/test`
- **ファイル**: `/app/test/page.tsx`
- **機能**: 赤い背景のスタイルテスト用ページ

- **URL**: `/test-style`
- **ファイル**: `/app/test-style/page.tsx`
- **機能**: CSSスタイルテスト用ページ

### Pages Router (`/pages` ディレクトリ)

#### 認証
- **URL**: `/login`
- **ファイル**: `/pages/login.tsx`
- **機能**: ログイン画面
- **内容**:
  - ユーザー名・パスワード入力フォーム
  - JWT認証処理
  - エラーメッセージ表示

#### インシデント管理

##### インシデント一覧
- **URL**: `/incidents`
- **ファイル**: `/pages/incidents/index.tsx`
- **機能**: インシデント一覧表示
- **内容**:
  - インシデントリスト
  - ページネーション
  - 詳細ページへのリンク

##### インシデント詳細
- **URL**: `/incidents/{id}`
- **ファイル**: `/pages/incidents/[id].tsx`
- **機能**: 個別インシデント詳細表示
- **内容**:
  - インシデント情報テーブル
  - 一覧に戻るボタン

##### インシデント新規作成
- **URL**: `/incidents/new`
- **ファイル**: `/pages/incidents/new.tsx`
- **機能**: 新規インシデント作成
- **内容**:
  - 作成フォーム（タイトル、説明、重要度、発生日時）
  - バリデーション
  - 成功・エラーメッセージ

## API通信

### API関数
- **ファイル**: `/lib/api.ts`
- **機能**: バックエンドAPI通信
- **エンドポイント**:
  - `POST /auth/login` - ログイン
  - `GET /api/incidents` - インシデント一覧取得
  - `GET /api/incidents/{id}` - インシデント詳細取得
  - `POST /api/incidents` - インシデント作成

## ナビゲーション構造

```
Header Navigation:
├── 🗂 KnowledgeBase (ロゴ)
├── ダッシュボード (/)
├── インシデント (/incidents)
└── ログイン (/login)

Page Flow:
/ (ダッシュボード)
├── /incidents (一覧)
│   ├── /incidents/{id} (詳細)
│   └── /incidents/new (新規作成)
└── /login (認証)
```

## 現在のスタイル状態

- **デザイン**: シンプルなHTML + 基本的なインラインスタイル
- **CSS**: 最小限のリセットCSS (`/app/globals.css`)
- **レスポンシブ**: 基本的な対応
- **テーマ**: なし（ブラウザデフォルト）

## 機能状況

### 実装済み
- ✅ 全ページの基本構造
- ✅ ルーティング設定
- ✅ API通信機能
- ✅ フォーム処理
- ✅ エラーハンドリング

### 未実装
- ❌ 認証状態管理
- ❌ ローディング状態
- ❌ 詳細なバリデーション
- ❌ 検索・フィルター機能
- ❌ 編集・削除機能

## 技術仕様

### 依存関係
- React 19.2.0
- Next.js 16.0.5
- TypeScript 5
- Tailwind CSS 4 (設定済みだが未使用)

### 設定ファイル
- `next.config.ts` - Next.js設定
- `tsconfig.json` - TypeScript設定
- `package.json` - 依存関係
- `postcss.config.mjs` - PostCSS設定

## 開発メモ

- App RouterとPages Routerの混在構成
- メインページ（ダッシュボード）はApp Router
- 機能ページ（ログイン、インシデント管理）はPages Router
- 全ページでシンプルなHTMLスタイルを採用
- 将来的なデザイン拡張に対応可能な構造