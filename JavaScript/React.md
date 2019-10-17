# React

## redux-thunk
- 公式: https://github.com/reduxjs/redux-thunk
- dispathを遅延で評価する
- モチベーション
  - dispatchで贈りたいデータをfetchしたデータにしたい。`(ex)store.dispatch(fetch(URL))`
  - fetch(URL)に対して、インジケーターなどを表示したい
- action+disaptch ==>> reducer の間に処理を挟む。
- `dispatch(actionCreator(user))`
  - actionCreator = Thunk
  - actionCreatorは関数。Thunk関数は、Redux-Thunkのミドルウェアにて実行される  
  - thunk関数＝第一引数dispatch、第二引数getState
  - thunkの中でdispatchを行える
REF: https://qiita.com/IgnorantCoder/items/ac681c97eb8318a87bb3
REF: https://kde.hateblo.jp/entry/2019/02/14/220155

