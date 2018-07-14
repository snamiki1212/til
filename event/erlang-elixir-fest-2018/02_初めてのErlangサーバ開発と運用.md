---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "02_初めてのErlangサーバ開発と運用"
# categories: [ "Event", "erlang-elixir-fest-2018" ]
# tags: [ "Poem", "erlang-elixir-fest-2018" ]
---


# 初めてのErlangサーバ開発と運用 (mookjp)

## Intro

携わってるサービス

- Webアプリ開発
- チャットシステム

 

## WhyErlang

### Node

- Architecture
  1. イベントループ
  2. シングルスレッド
- 問題発生時
  - 予期せぬ例外で、シングルスレッドなので、プロセスレベルでダウン
  - イベントループに積まれてる未処理の実行が全て破棄される
  - クライアントコネクションが全て切断される

★被害範囲が大きい



### Erlang

- Architecture
  1. メッセージパッシング
  2. 軽量マルチプロセス
- 問題発生時
  - 軽量プロセス単位でダウン
  - Supervisor-treeのStrategyに基づいてダウンしたプロセスに対して再起動などのアクションを起こす

★被害範囲が小さい



## CaseStudy：Msgつまり

#### BatPattern

1. メッセージを全体に送信
2. 各プロセスで必要ないメッセージは破棄

→全プロセスに無題にメッセージパッシングされてしまう

#### GoodPattern

- gprocでメッセージディクショナリー

1. メッセージをgpocに送信
2. gprocが送信する対象プロセスをハンドリングして宛先を絞ってくれる

→無駄なメッセージパッシングが減少する

→ElixirではRegisteryが標準で搭載されている



### まとめ

- [Erlang in Anger](https://www.erlang-in-anger.com/)を最初に読むべき　→VMのメモリ確保の挙動
- 英語力が超必要
- 公式ドキュメント大事
- Erlang Slackチャネルおすすめ→すぐ回答してくれる

