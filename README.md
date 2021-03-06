# markdown2sqltable
markdownからsqlのCreateTaboe文等を生成する

## 使い方
### markdownでDB設計をする
#### 例
```
項番  | 項目名   | カラム名         | PK | FK | IDX | 型           | NOTNULL  | 備考
------|----------|------------------|----|----|-----|--------------|----------|----------------------------
 1    | ID       | user_id          | ● |    |     | VARCHAR(13)  | ●       | (USR)[0-9]{10}             
 2    | 名前     | user_name        |    | ● | ●  | VARCHAR(100) | ●       |                            
 3    | 状態     | user_state       |    | ● |     | VARCHAR(13)  | ●       | good or bad                
 4    | 作成日時 | create_date_time |    |    |     | DATE         | ●       |                            
 5    | 更新日時 | update_date_time |    |    |     | DATE         | ●       |                            
 6    | 備考     | extra            |    |    |     | VARCHAR(256) | ●       | サーバ名やリクエストIDなど 
```

#### 列説明
- 1列目:プログラム上は利用していません
- 2列目:プログラム上は利用していません
- 3列目:カラム名
  - このカラムがカラム名になります
  - SQLのフォーマットに従ったカラム名を指定してください
- 4列目:プライマリキー
  - プライマリキーの場合は何か文字を入力してください
- 5列目: プログラム上は利用していません
- 6列目: インデックス
  - カラムにインデックスを張る場合は何か文字を入力してください
- 7列目: 型
- 8列目: NOT NULL
  - NOT NULL制約をつけたい場合は何か文字を入力してください
- 9列目以降: プログラム上は利用していません

### 実行
```
node . input.md outRootDir
```

## 今後やりたいこと
- 複合インデックス対応
- autoincrementをnotnull列に書く