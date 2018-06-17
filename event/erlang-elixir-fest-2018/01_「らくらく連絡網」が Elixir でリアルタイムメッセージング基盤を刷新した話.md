##  「らくらく連絡網」が Elixir でリアルタイムメッセージング基盤を刷新した話 (rinosamakanata)

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

- ★erlybely
- [recon_ex](https://github.com/tatsuya6502/recon_ex)



### 監視

- [zabbix](https://www.zabbix.com/)
- [Exometer_zabbix](https://github.com/tverlaan/exometer_zabbix)でBEAMのメトリクス



### まとめ／QA

- Erlangは覚える必要はほぼなし。だが、BEAMについては知っておくべき
  - QA：BEAMの勉強方法→[TheBeamBook](https://github.com/happi/theBeamBook)がおすすめ
- Q.エディタは何使ってる？
  - A.InteliJ



### 所感

- ゲーム以外の導入事例は初めて見たが、メッセージングサービス／リアルタイムコミュニケーションのWebサービスとPhoenixの相性は確かに良い

### あとで調べることまとめ

- クラスタ化vs非クラスタ化
- BEAMについての勉強を行う
- InteliJが良さげなら、購入
- 各種のツールの概要理解
- [the beam book](https://github.com/happi/theBeamBook)
