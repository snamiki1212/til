

リアルタイムマッチングのアーキテクチャとロジック

## 1. mixi


## 1. [ステートフルで大規模アクセスのあるsoft-realtimeなゲームサーバーをeasyにつくる](https://speakerdeck.com/ne_sachirou/sutetohurudeda-gui-mo-akusesufalsearusoft-realtimenagemusabawoeasynitukuru?slide=22)

### Pre
- Drecom
- Elixir/Phoenix
- HTML5
- TCG
- RealTimePvP
- AWS
- Kubernates
- WebSocket
- Redis(as Storage and PubSubServer)

### Atchitecture
- MatchingChennlとGameChannelを分ける
- MatchingLogic
  
  - マッチングレーティングの幅が時間に応じて広がる
  - redisのsorted setで格納して無限ループでマッチングの参照を行う

- Storage
  - redis
  - Lockを用いた排他制御
  - Distributed locks with Redisの考え(ドキュメント参照)

- Endpoint

   - scale out して複数のエンドポイントが発生した時。→Userはどのサーバのエンドポイントに接続してもOK。PhoenixAppのPubSubレイヤーで同一PubSubを使用することで、繋げられる
    
- Channel

  - ユーザごとに異なる複数のChannelを使用。→反省点(?)：時間経過管理が複雑になってしまった。

- HotDeploy
  
  - 接続しているChannelが終了したらServerDown
  
