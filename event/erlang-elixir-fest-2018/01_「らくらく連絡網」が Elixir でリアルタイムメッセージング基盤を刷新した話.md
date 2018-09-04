---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "01_「らくらく連絡網」が Elixir でリアルタイムメッセージング基盤を刷新した話"
# categories: [ "Event", "erlang-elixir-fest-2018" ]
# tags: [ "Poem", "erlang-elixir-fest-2018" ]
---

## 1.  「らくらく連絡網」が Elixir でリアルタイムメッセージング基盤を刷新した話 (rinosamakanata)

### 概要

-  ラクラク連絡網
  - メーリングリスト
  - リアルタイムトーク

- 会社：[イオレ](http://www.eole.co.jp/)
- Ruby → Elixir



### クラスタ化 vs  非クラスタ化

- クラスタ化してる。なぜなら、[quantumn](https://github.com/quantum-elixir/quantum-core)で個別ノードでcron実行できる機能を使いたいから。
- [peerange](https://github.com/mrluc/peerage)
- 垂直／水平スケール



### Frontend

- WebView

- [Elm](http://elm-lang.org/)
  - VirtualDOMが高速



### 調査

- [erlyberly](https://github.com/andytill/erlyberly)

  > erlyberly is a debugger for erlang, elixir and LFE using erlang tracing. It is probably the easiest and quickest way to start debugging your nodes.

- [recon_ex](https://github.com/tatsuya6502/recon_ex)

  > ReconEx is an Elixir wrapper for Recon. It is a library to be dropped into any other Elixir project, to be used to assist DevOps people diagnose problems from iex shell in production Erlang VMs.

- [recon](https://github.com/ferd/recon)

  > Recon wants to be a set of tools usable in production to diagnose Erlang problems or inspect production environment safely.

### 監視

- [zabbix](https://www.zabbix.com/)

  > Zabbix is an open source monitoring software for networks, operating systems and applications, created in Latvia by Alexei Vladishev. It is designed to monitor and track the status of various network services, servers, and other network hardware.
  
- [Exometer_zabbix](https://github.com/tverlaan/exometer_zabbix)でBEAMのメトリクス

  > A light wrapper around exometer.
  > Elixometer allows you to define metrics and subscribe them automatically to the default reporter for your environment.

- [exometer](https://github.com/Feuerlabs/exometer)

  > The Exometer package allows for easy and efficient instrumentation of Erlang code, allowing crucial data on system performance to be exported to a wide variety of monitoring systems.

### まとめ／QA

- Erlangは覚える必要はほぼなし。だが、BEAMについては知っておくべき
- Q. BEAMの勉強方法は何？
  - A. [TheBeamBook](https://github.com/happi/theBeamBook)がおすすめ
- Q. エディタは何使ってる？
  - A. InteliJ

### 所感

- ゲーム以外の導入事例は初めて見たが、メッセージングサービス／リアルタイムコミュニケーションのWebサービスとPhoenixの相性は確かに良い
