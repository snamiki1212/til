# GenStageの学習メモ
## GenStageとは
- BackPressure モデル
- ３つの役割(producer, consumer, producer_consumer)
- 起動・構築は下記のどちらかでできる
1. SupervisorTree経由
2. 明示的に関数での実行経由
- send/receiveでステージ毎にデータの授受を行うことで、データフローされる
- producer/consumerは複数持てる
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

### callback
- init/1
  下記の役割のうち、どれかを定義
  1. producer
  2. consumer
  3. procuer_consumer

producerの場合
  - `handle_demand/2`の実装が必須


### Producer

- demandのreceiveをトリガー
> つまり、GenStageは需要トリガーを元にストリームイベントを処理するライブラリなのです。需要トリガーで供給を引っ張ることを、ストリーム界隈(?)ではバックプレッシャー(1背圧)といいます。
- 現在の値を保持する(GenServerと同じく値の保持がある)

### Dispatcher
イベントの配布方法。`consumer`から`event`が流れることはないので、`producer`と`producer_cosumer`にて設定する。
1. `DemandDispatcher`: BackPressureによるDemandトリガーなモデル
2. `PartitionDispatcher`: Eventに応じてDispatcherを変動
3. `BroadcastDispatcher`: 全ConsumerにBroadcast

## Reference
- [GenStage - hexdoc](https://hexdocs.pm/gen_stage/GenStage.html)
- [Elixir School - GenStage](https://elixirschool.com/ja/lessons/advanced/gen-stage/)
- [ElixirのGenStageに入門する #1](https://qiita.com/twinbee/items/12a61863ceef794996e0?utm_campaign=popular_items&utm_medium=twitter&utm_source=dlvr.it)
- [ElixirのGenStageに入門する#2 バックプレッシャーを理解する](https://qiita.com/twinbee/items/eda7f70fa9e4651f2248)

