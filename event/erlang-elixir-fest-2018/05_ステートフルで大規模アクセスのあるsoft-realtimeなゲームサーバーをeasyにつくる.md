# ステートフルで大規模アクセスのあるsoft-realtimeなゲームサーバーをeasyにつくる

## INTRO

- TCG
- PvP
- HTML5
- Real-time



## 開発思想／理念

- 後からメンバがJoinしやすいように、できる限りレールは引いた（libraryの列挙と説明）
- GenServerでの想定のコツは、多人数のケースを想定せず、２人のケースで想定すれば十分。

## 設計

### Channel

1. matching Channel
2. PvP Channel
   - 理由；Matching条件が複数あるので、複数あるので、分離したいので。



### HotCode

HotCodeDeployは行ってない。大変なので。下記で行ってる

1. Deploy処理
2. 各ServerへKill予定の通知
3. Phoenixへの接続がなくなるまで待つ
4. なくなったら、Deploy



### Data

- 作業内容をすべて履歴として残す。
- あとで、joinしたユーザはこの内容を元に描画する（たぶん、イベントソーシング思考ってこと
- または、この情報をAI化する



## Knowledge

PhoenixのLoggerが1プロセスしかない。なので、大量Loggingがあると

1. msgが詰まる
2. Log出力の実行プログラムがLog実行と同期的になってしまう。

`Compile_time_purge`の設定は大きくしておくと良い。



