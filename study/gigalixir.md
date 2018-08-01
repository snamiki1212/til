---
date: "2018-06-20"
last-mod: "2018-06-21"
title: "gigalixir"
slug: "gigalixir.md"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "GenServer", "PaaS"]
---

#
Gigalixirを使用した際のメモ

[gigalixirのファウンダーのJesse Shieh曰く](https://gigalixir.com/#/about)、elixirのプロジェクトを本番稼働させるに当たった今まで多くのコストが掛かっていた分をアプリケーション開発に集中させたいという思いを元に作成したとのこと。

ちなみに、gigalixirを進めるケースについても、[Phoenixの公式ドキュメント](https://hexdocs.pm/phoenix/heroku.html)にも書いてある。

# 導入
[Getting started](http://gigalixir.readthedocs.io/en/latest/main.html)が用意されているので、これ通りに進めれば基本的に問題ない。

導入時のケース

1. 新規プロジェクト

    [新規プロジェクト用に提供されているrepository](https://github.com/gigalixir/gigalixir-getting-started)を使う。

    メリットとして、cloneすれば良いのでセットアップが一瞬で終わる。

    デメリットとして、プロジェクト名が*GettingStartedGigalixir*になってしまう。

2. 既存プロジェクト

    既存のプロジェクトに対してセットアップを行っていく。

既存プロジェクトの際の手順も用意されている難しくないので、学習を兼ねて2がおすすめ。

# 注意点

## MySQLは対応外

gigalixirが提供しているdatabase as a serviceのはpostgresq一択でmysqlが対応していない。
もし、mysqlを使いたい場合は、
- gigalixirではないcloud service
- sqlは外部servieを参照する
という2択になる。

## Redisなどのキャッシュサービスは提供していない

理由は、「基本的にはElixirのAgent/ETSなどのオンキャッシュを使えばcache serviceは使用する必要がない」から、とのこと

## Reference

- [Gigalixir](https://gigalixir.com/)
- [Gigalixir Documentaion](http://gigalixir.readthedocs.io/en/latest/index.html)
- [Gigalixir: Platform-as-a-Service designed just for Elixir/Phoenix - Elixir Chat - Elixir Forum](https://elixirforum.com/t/gigalixir-platform-as-a-service-designed-just-for-elixir-phoenix/4946/48)
- [Phoenix - hex - Deploying on Heroku](https://hexdocs.pm/phoenix/heroku.html)
