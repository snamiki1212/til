---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "03_Phoenixアプリケーションを１年間運用して分かったこと"
# categories: [ "Event", "erlang-elixir-fest-2018" ]
# tags: [ "Poem", "erlang-elixir-fest-2018" ]
---

# Phoenixアプリケーションを１年間運用して分かったこと

想定対象： これから、Elixir/Phoenixを活用していく人に向けて

## Intro 

- 会社
  - 40人位が使用してる
  - 新規事業で多く採用
    - ゲーム、ID管理
    - コミュニケーションサービス
    - ECサイト



## Game Server Architecture

- 2server間(API<->WebSocket)はRPC接続
- 対戦マッチング用サーバは別に存在



## Umbrella

### Problem

ElixirはLV系のスクリプト言語と同等レベルで生産量は極めて高い。がコード量がどうしても多くなると、

ManyServicesになると、多々の問題が発生。（Deploy時間がかかる、etc...

→ではMicroService化する？



## Solution

- 複数サービスを１レポで管理
- サービス間でコード共有

- Umbrellaプロジェクトを使えば、1repoをアプリケーションレイヤで分割できる

### Deploy

- 問題：デプロイのタイミングでsocketが切断される
- 解決：WebSocketとLogicサーバで分離→socketが切断されなくなる



## Compile

macroはcompile-timeに評価

dependenciesが生まれると、関連モジュールもrecompielされる

### 問題

問題：１ファイルの修正に伴い、３００ファイル近くがrecompileされる。

　→生産性が低下

### 対象例

1. __
2. 構造体
3. import
4. behavior
5. protocol
6. type spec



### 原因

循環とは？dependencyの先に更にdependencyが発生していく形。

循環のコンパイル

循環を取り除く　＝　無駄なコンパイル依存を削除する　＝　依存を取り除く

``` elixir
> mix xref graph -format dat
```



### Slow Test

Testのロード／コンパイルtimeが長い

最善：プロジェクトを分割するのが良い



## Monitoring

- 対象
  - ETS table
  - 各API単位
- Tool
  - Prometeus
  - Grafana
- Erlang VM用のGrafnanaDash



## 調査

よく使うモノ

- recon
- remsh

## Library

- 所感：現時点で必要なものは一通り揃っている
- ただ、無いものは作った、もしくば一部変更して使ってる



## QA

- Q. Phoenix1.4 のContextの導入は？

  - A. 今後、追従する。ボリュームは重い。DDDではないので、ゆるく行う予定。

- Q. 困ったときのコミュニティは？

  - A. ElixirConf主催のTokyoEX、海外のElixirSlackChannel、ErlangFactory

- Q. DIalyzerは使用してる？理由は？

  - 使用してない。理由は、時間がないｗ、から

  - コードが読みやすくなるので、できる限り書きたいとは思ってる。

    



## 所感

- compile-timeの削減のために無駄なdependenciesを削除するのは、恩恵に対して、作業量が多そうなので、品質向上フェーズのタイミングで行うべき作業かと思われる
