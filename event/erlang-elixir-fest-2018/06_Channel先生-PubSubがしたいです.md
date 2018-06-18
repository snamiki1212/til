# Channel先生...!! PubSubがしたいです...

- phoenixを使用する際の最大の利点はpubsubだと考えている

- [5min phoenix channel app](https://github.com/chrismccord/phoenix_chat_example)の内容を元に。



### pubsub とは？

購読＝subscribe

- topicに対して送信
- topicから受信

タグ付け、に近い概念。



### PubSub Backend

- pg2
- redis
- 3rd party
- adapterで独自実装



### QA

- なぜAdapterを作成した？
  - 性能面で。1台のRedisだと要件を満たせられない
