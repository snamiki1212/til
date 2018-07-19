---
date: "2018-07-19"
last-mod: "2018-07-19"
title: "memo: Getting Started on Heroku with PHP"
slug: "heroku-getting-started.md"
categories: [ "TIL", "Heroku" ]
tags: [ "TIL", "Heroku"]
---

[Getting Started on Heroku with PHP](https://devcenter.heroku.com/articles/getting-started-with-php)を行った際のメモ

## dyno

- heroku platform上で扱われるコンテナシステムの名称またはコンテナ自体を指す。
- `<~root_dir>/Procfile`の値を元に構築される
- `heroku`コマンドで操作可能

```sh
heroku ps
```

## deploy

- gitを使ってデプロイする
- remote repositoryにherokuを登録する
- heroku remote repositoryにpushすることで、deployが行われる

```sh
# register heroku as remote repository
heroku create

# deploy
git push heroku master

# open page
heroku open
```

## ssh connect

```sh
# heroku run <command>
heroku run "php -a"
heroku run bash
```

## Env

```sh
# localで定義の設定
heroku config:set TIMES=20

# 上記で定義したenvをdeploy
heroku config
```

## add-on

- 3rd-party service群
- databaseの作成もadd-on内の仕組みで行う

## その他

getting started tutorialのdependency項目で表示される結果確認ページがかわいい
![image](https://user-images.githubusercontent.com/26793088/42929598-7e647bb6-8b75-11e8-8ce6-07771c4ef340.png)

---
