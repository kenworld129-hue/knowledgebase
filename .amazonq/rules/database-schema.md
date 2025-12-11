# 🗂 障害管理ツール `KnowledgeBase` データベース定義

## 1. データベース情報

* **データベース名:** `knowledge_base`
* **所有者:** `postgres`
* **エンコーディング:** `UTF8`
* **照合順序（Collate）:** `ja_JP.UTF-8`
* **Ctype:** `ja_JP.UTF-8`
* **ロケールプロバイダー:** `libc`

```sql
knowledge_base=# \l knowledge_base
```

| 名前             | 所有者      | エンコーディング | 照合順序        | Ctype       | ICUロケール | ロケールプロバイダー | アクセス権限 |
| -------------- | -------- | -------- | ----------- | ----------- | ------- | ---------- | ------ |
| knowledge_base | postgres | UTF8     | ja_JP.UTF-8 | ja_JP.UTF-8 |         | libc       |        |

---

## 2. テーブル一覧と役割

| テーブル名           | 役割                                                     |
| --------------- | ------------------------------------------------------ |
| `users`         | システムにアクセスするユーザーの情報を管理。ログイン情報、権限、登録・更新日時などを保存。          |
| `incidents`     | 実際の障害情報を保存する中心テーブル。障害タイトル、詳細、原因、対応内容、発生日・解決日、重大度などを管理。 |
| `tags`          | 障害にラベルを付けるタグを管理。障害の種類や分類を柔軟に表現。                        |
| `incident_tags` | `incidents` と `tags` の多対多関係を管理。障害に複数タグ、タグに複数障害を紐付け可能。  |
| `comments`      | 障害に対するコメントや補足情報を管理。誰がどの障害にコメントしたかを追跡。                  |

---

## 3. 各テーブル詳細定義

### 3.1 `users`
| 列名            | 型                      | Null許容   | デフォルト                   | 説明               |
| ------------- | ---------------------- | -------- | ----------------------- | ---------------- |
| id            | integer                | not null | nextval('users_id_seq') | 主キー              |
| username      | character varying(100) | not null |                         | ユーザー名（ユニーク）      |
| password_hash | text                   | not null |                         | ハッシュ化パスワード       |
| role          | character varying(50)  | not null |                         | 権限（admin / user） |
| created_at    | timestamp              |          | CURRENT_TIMESTAMP       | 登録日時             |
| updated_at    | timestamp              |          | CURRENT_TIMESTAMP       | 更新日時             |

---

### 3.2 `incidents`
| 列名          | 型                      | Null許容   | デフォルト                       | 説明            |
| ----------- | ---------------------- | -------- | --------------------------- | ------------- |
| id          | integer                | not null | nextval('incidents_id_seq') | 主キー           |
| title       | character varying(255) | not null |                             | 障害タイトル        |
| description | text                   |          |                             | 詳細説明          |
| root_cause  | text                   |          |                             | 原因分析          |
| resolution  | text                   |          |                             | 対応内容          |
| system_name | character varying(100) |          |                             | 対象システム名       |
| occurred_at | timestamp              |          |                             | 発生日           |
| resolved_at | timestamp              |          |                             | 解決日           |
| severity    | character varying(20)  |          |                             | 重大度           |
| created_by  | integer                |          |                             | 登録者（users.id） |
| created_at  | timestamp              |          | CURRENT_TIMESTAMP           | 登録日時          |
| updated_at  | timestamp              |          | CURRENT_TIMESTAMP           | 更新日時          |

---

### 3.3 `tags`
| 列名   | 型                      | Null許容   | デフォルト                  | 説明        |
| ---- | ---------------------- | -------- | ---------------------- | --------- |
| id   | integer                | not null | nextval('tags_id_seq') | 主キー       |
| name | character varying(100) | not null |                        | タグ名（ユニーク） |

---

### 3.4 `incident_tags`
| 列名          | 型       | Null許容   | 説明                 |
| ----------- | ------- | -------- | ------------------ |
| incident_id | integer | not null | 障害ID（incidents.id） |
| tag_id      | integer | not null | タグID（tags.id）      |

**制約・インデックス:**

* PRIMARY KEY: `(incident_id, tag_id)`
* 外部キー: `incident_id` → `incidents.id` ON DELETE CASCADE
  `tag_id` → `tags.id` ON DELETE CASCADE

---

### 3.5 `comments`
| 列名          | 型         | Null許容   | デフォルト                      | 説明                 |
| ----------- | --------- | -------- | -------------------------- | ------------------ |
| id          | integer   | not null | nextval('comments_id_seq') | 主キー                |
| incident_id | integer   |          |                            | 障害ID（incidents.id） |
| user_id     | integer   |          |                            | 投稿者（users.id）      |
| comment     | text      | not null |                            | コメント本文             |
| created_at  | timestamp |          | CURRENT_TIMESTAMP          | 投稿日時               |

---

## 4. ポイント

* 中間テーブル `incident_tags` により多対多関係を実現
* 外部キーに `ON DELETE CASCADE` を設定、障害やタグ削除時に関連データを自動削除
* `comments` テーブルで障害対応の議論履歴を追跡
* `users` テーブルで権限管理と操作履歴の管理

---

## 5. ER図（概念図）

```
users (1) ----< (N) incidents
  |                    |
  |                    |
  +----< (N) comments  |
                       |
                       |
         incident_tags (中間テーブル)
                |      |
                |      |
         incidents (N) ---- (N) tags
```

---

## 6. テーブル作成SQL

```sql
-- users テーブル
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- incidents テーブル
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    root_cause TEXT,
    resolution TEXT,
    system_name VARCHAR(100),
    occurred_at TIMESTAMP,
    resolved_at TIMESTAMP,
    severity VARCHAR(20),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tags テーブル
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- incident_tags テーブル（中間テーブル）
CREATE TABLE incident_tags (
    incident_id INTEGER NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (incident_id, tag_id)
);

-- comments テーブル
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER REFERENCES incidents(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. インデックス推奨

```sql
-- incidents テーブル
CREATE INDEX idx_incidents_created_by ON incidents(created_by);
CREATE INDEX idx_incidents_occurred_at ON incidents(occurred_at);
CREATE INDEX idx_incidents_severity ON incidents(severity);

-- comments テーブル
CREATE INDEX idx_comments_incident_id ON comments(incident_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- incident_tags テーブル
CREATE INDEX idx_incident_tags_tag_id ON incident_tags(tag_id);
```