# markdown2sqltable
markdownからsqlのCreateTaboe文等を生成する

## 使い方
### markdownでDB設計をする
```
# user: ユーザ
## user_state: ユーザ状態テーブル
項番 | 項目名 | 項目名（英字）  | PK | FK | IDX | 型 | NOT NULL | フォーマット | 個人情報 | 更新可 | 備考
----|----------|---------------|---|---|---|---|---|---|---|---|---
 1  | ID       | user_id          | ● |  |  | VARCHAR(13) | ● | (USR)[0-9]{10} |  |  | 
 3  | 名前     | user_name        |  | ● | ● | VARCHAR(100) | ● | | | | 
 4  | 状態     | user_state       |  | ● |  | VARCHAR(13) | ● | good or bad |  |  | 
 9  | 作成日時 | create_date_time |  |  |  | DATE | ● |  |  |  | 
10  | 更新日時 | update_date_time |  |  |  | DATE | ● |  |  | ● | 
11  | 備考     | extra            |  |  |  | VARCHAR(256) | ● |  |  | ● | サーバ名やリクエストIDなど 
```

