# システム障害管理ツール - アーキテクチャ

## プロジェクト概要
システム障害（インシデント）を記録・管理するWebアプリケーション

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 16.0.5
- **言語**: TypeScript 5
- **UIライブラリ**: React 19.2.0
- **スタイリング**: Tailwind CSS 4

### バックエンド
- **言語**: Rust (edition 2021)
- **Webフレームワーク**: Axum 0.8.7
- **非同期ランタイム**: Tokio 1.37
- **データベース**: PostgreSQL
- **ORMライブラリ**: SQLx 0.8.6
- **認証**: JWT (jsonwebtoken 9) + bcrypt 0.15
- **CORS**: tower-http 0.6.7

## ディレクトリ構造

```
knowledgebase/
├── backend/
│   ├── src/
│   │   ├── auth/           # JWT認証関連
│   │   │   ├── jwt.rs      # JWTトークン生成・検証
│   │   │   ├── middleware.rs # 認証ミドルウェア
│   │   │   └── mod.rs
│   │   ├── handlers/       # リクエストハンドラー
│   │   │   ├── incidents.rs # インシデントCRUD
│   │   │   ├── login.rs    # ログイン処理
│   │   │   └── mod.rs
│   │   ├── models/         # データモデル
│   │   │   ├── incident.rs # Incident構造体
│   │   │   └── mod.rs
│   │   ├── routes/         # ルーティング定義
│   │   │   ├── auth.rs     # 認証ルート
│   │   │   ├── incidents.rs # インシデントルート
│   │   │   └── mod.rs
│   │   ├── db.rs           # DB接続プール
│   │   └── main.rs         # エントリーポイント
│   ├── .env                # 環境変数
│   └── Cargo.toml          # 依存関係
└── frontend/
    ├── app/                # App Router
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── pages/              # Pages Router
    │   ├── incidents/      # インシデント画面
    │   │   ├── index.tsx   # 一覧
    │   │   ├── [id].tsx    # 詳細
    │   │   └── new.tsx     # 新規作成
    │   └── login.tsx       # ログイン画面
    ├── lib/
    │   └── api.ts          # API通信ユーティリティ
    └── package.json
```

## データベース構造

### incidents テーブル
- `id`: 主キー
- `title`: タイトル
- `description`: 説明
- `root_cause`: 根本原因
- `resolution`: 解決方法
- `system_name`: システム名
- `occurred_at`: 発生日時
- `resolved_at`: 解決日時
- `severity`: 重要度
- `created_by`: 作成者

## 認証フロー

1. **ログイン**: `/auth/login` (POST)
   - ユーザー名・パスワードを送信
   - bcryptでパスワード検証
   - JWTトークンを返却

2. **認証済みリクエスト**:
   - Authorizationヘッダーに `Bearer <token>` を付与
   - ミドルウェアでJWT検証
   - 検証成功時のみリクエスト処理

## API エンドポイント

### 認証
- `POST /auth/login` - ログイン
- `GET /auth/incidents` - インシデント一覧（認証必須）

### インシデント管理
- `GET /api/incidents` - 一覧取得（ページネーション対応）
- `GET /api/incidents/{id}` - 詳細取得
- `POST /api/incidents` - 新規作成

## 状態管理

### AppState
```rust
pub struct AppState {
    pub pool: PgPool,      // DB接続プール
    pub secret: String,    // JWT秘密鍵
}
```

全てのハンドラーで`State<AppState>`を使用し、DB接続とJWT秘密鍵を共有

## 環境変数

```
DATABASE_URL=postgres://dev_user:dev_password@localhost:5432/knowledge_base
JWT_SECRET=your-secret-key-change-this-in-production
```

## 開発状況

### 実装済み
- ✅ バックエンドAPI基盤（Axum）
- ✅ PostgreSQL接続
- ✅ インシデントCRUD操作
- ✅ JWT認証機能
- ✅ 認証ミドルウェア
- ✅ CORS設定
- ✅ フロントエンド基盤（Next.js）

### 開発中
- 🔄 ログイン認証機能の統合テスト
- 🔄 フロントエンド・バックエンド連携

## 起動方法

### バックエンド
```bash
cd backend
cargo run
# http://127.0.0.1:8000
```

### フロントエンド
```bash
cd frontend
npm run dev
# http://localhost:3000
```

## セキュリティ考慮事項

- パスワードはbcryptでハッシュ化
- JWTトークンで認証状態を管理
- CORS設定でクロスオリジンリクエストを制御
- 本番環境では強力なJWT_SECRETを使用すること