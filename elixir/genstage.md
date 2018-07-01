# GenStageの学習メモ

## 概要

- Demand-Driven
- Back-Pressure モデル(Back-Pressureモデルが不要なら、並列処理を行う類似方法は`Task.asny_stream/2`で行える

  > つまり、GenStageは需要トリガーを元にストリームイベントを処理するライブラリなのです。需要トリガーで供給を引っ張ることを、ストリーム界隈(?)ではバックプレッシャー(背圧)といいます。

- ３つの役割(producer, consumer, producer_consumer)
- 起動・構築は下記のどちらかでできる
  1. SupervisorTree経由
  2. 関数での実行経由
- send/receiveでステージ毎にデータの授受を行うことで、データフローされる
- producer/consumerは複数持てる
- GenServerのラッピング
- 並列処理
- 複数step処理にはしないで、3層レイヤに留める
  ```
  NG: [Producer] -> [Step 1] -> [Step 2] -> [Step 3]
  ```

  ```
  OK:
               [Consumer]
              /
  [Producer]-<-[Consumer]
              \
               [Consumer]
  ```

  > if your domain has to process the data in multiple steps, you should write that logic in separate modules and not directly in a GenStage.


## Buffer
- event/demandは各stageのqueueにbufferされる
- stageが構築される前に実行された分もキューイングされる。
- 例えば、consumerがcrashしてrestartするまでの間のデータをロストしないようにするため。


## Callback
- init/1
  下記の役割のうち、どれかを定義
  1. producer
  2. consumer
  3. procuer_consumer

|callbacks|producer|producerconsumer|consumer|
|---|---|---|---|
|`init`|must|must|must|
|`handledemand/2`|must|-|-|
|`handle_event/2`|-|must|must|
|*GenServer's*|available|available|available|


## Producer

- demandのreceiveをトリガー
- 現在の値を保持する(GenServerと同じく値の保持がある)

## ProducerConsumer

## Consumer

## Dispatcher
イベントの配布方法。`consumer`から`event`が流れることはないので、`producer`と`producer_cosumer`にて設定する。
1. `DemandDispatcher`: BackPressureによるDemandトリガーなモデル
2. `PartitionDispatcher`: Eventに応じてDispatcherを変動
3. `BroadcastDispatcher`: 全ConsumerにBroadcast

## asnycronous
- `consumer`/`producer_consumer`は`handle_event`の終了タイミング＝再度`producer`への要求タイミングと認識して、`demand`を`producer`へ投げる
- 上記内容はcall_back内で自動的に行うが、手動で行いたい場合は
  - `handle_subscribe`を定義
  - `{:manual, event}`をreturn
  - `Producer`への要求は`GenStage.ask/3`で行う
- Back-Pressureとして、量を調節する機構は`Consumer`にて行い、レートリミッタとして実現する
  > 時間間隔ごとに限られた数のイベントを処理できるコンシューマを実装しましょう。これらはレートリミッタと呼ばれることがよくあります。  

## YouTube
[Elixir London June 2016 w/ José Valim](https://www.youtube.com/watch?time_continue=264&v=aZuY5-2lwW4)
- 基本的な流れ
  ![image](https://user-images.githubusercontent.com/26793088/42125238-c5592b10-7cad-11e8-803a-9eda3e52e668.png)

- Back-Pressure
  ![image](https://user-images.githubusercontent.com/26793088/42125271-9175f55c-7cae-11e8-8b59-0da77aa952ce.png)

  1. 「B←Cにasks10」
  2. 「A←BにAsks10」
  3. 「A→Bにsends max 10」
  4. 「B→Cにsends max 10」
  
  →後ろから始まるからBack-Pressure

- Demand-driven
  ![image](https://user-images.githubusercontent.com/26793088/42125274-9ea3e978-7cae-11e8-93fc-3338b845ceba.png)



## Reference
- [GenStage - hexdoc](https://hexdocs.pm/gen_stage/GenStage.html)
- [Elixir School - GenStage](https://elixirschool.com/ja/lessons/advanced/gen-stage/)
- [ElixirのGenStageに入門する #1](https://qiita.com/twinbee/items/12a61863ceef794996e0?utm_campaign=popular_items&utm_medium=twitter&utm_source=dlvr.it)
- [ElixirのGenStageに入門する#2 バックプレッシャーを理解する](https://qiita.com/twinbee/items/eda7f70fa9e4651f2248)

