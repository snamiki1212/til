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

## react-redux + hooks

example
- https://github.com/reduxjs/react-redux/issues/1335
- https://github.com/reduxjs/redux-thunk/issues/252

## immer

- reducer を簡易にしてくれる。Immustable.jsみたいにAPIがなく、生JSだけで実現できる。仕組みで解決してくれているので、仕組みを理解するだけで良いので、学習コストが低い。
- 関数型的ではなくて、むしろオブジェクト指向的にletチックな値のプロパティに代入する。なので、関数型的にReduceとかで複数行などになりがちな処理が、脳筋な数行でできる。
- imutable.jsだと文字通りイミュータブルにしてReducerを作成できるが、（１）Immustable.js専用の型を使うので、Object、Arrayなどと勘違いしてデータ事故る（２）Immustable.js用のAPIを知っていないといけない。
- REF: [https://immerjs.github.io/immer/docs/introduction](https://immerjs.github.io/immer/docs/introduction)

- 書き方

  ```ts
  // immer way
  const reducer = (state, action) => Immer.produce(state, draft => {
    switch(action.type){
      FETCH_SUCCESS: {
        const ={ data } = action.payload
        draft.data = data
        draft.isLoading = false
        return
      }
    }
  })
  ```

- 仕組み
  - draftstate=currentStateのProxy
  - mutation命令が終わったら、immerがdraftStateをもとに、nextStateを作成(produce)する
  - `[current] → [draft] → [next]`
    - current = originalデータ
    - draft = immerがoriginalデータをコピーして、Developerが好きにEditしてOKなデータ
    - next = immerがdraftをもとにnextを作成する


