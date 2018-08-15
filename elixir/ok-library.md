---
date: "2018-07-18"
last-mod: "2018-07-18"
title: "OK elixir Library"
slug: "ok-library"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "OK", "library" ]
---

## context

ジョインしたプロジェクトにて[OK - Library](https://github.com/CrowdHailer/OK)をラッピングしたModuleを使用してるので、機能理解のために調べた内容のメモを落としておく。


## whats is ok library?

> Elegant error/exception handling in Elixir, with result monads.

- error/exceptionのハンドリング用のライブラリ
- **result monads**を取り扱う

  `result monads` とは、下記のことを指す。と考えておく。

  ```elixir
  {:ok, value} | {:error, reason}
  ```


## OK library の設計思想

このライブラリの設計思想について、[Handling Errors in Elixir, No one say Monad.](http://insights.workshop14.io/2015/10/18/handling-errors-in-elixir-no-one-say-monad.html)に書いてあるが、わかりやすいように、要約と適当にピックアップする


### すべての返り値はResult Monadで返すべきだ

> Tempted to say all elixir funcs should return a result tuple. 

「すべての関数の返り値をresult tuple (= result monads)で返すべきだ」という少しばかり極端な思想が元になっている。

そして、そのresult monadsをキレイにさばく仕事をしてくれるのが`OK`ライブラリになる。

具体的には下記を担ってくれる。
1. 呼び出す関数の返り値がresult monad形式のみであることを保証
2. 呼び出した関数の返り値であるresult monadsの値を元に、value/reasonを変数にbindする作業を省略化
3. 呼び出した関数がerror monadだったときのエラー処理の最適化

## How to use OK Library

- OK libraryは決してraiseしない。また、OK library自体をtry-catchで囲って、内部でraiseもさせないこと。
- do-afterの間で処理を行いエラーが発生しなかった場合、after-endの値を元に返り値を生成する（詳細はmacroによって異なる)
- OK libraryは`for` / `try`２つのmacroが用意されている(すでにOK.withはdeprecated
- OK-Libraryのmacroの共通semanticsとして`<-`がある。
  - 右辺はresult monad型であること(`{:ok, value} | {:error, reason}`)
  - 1. `{:ok, value}`の場合
    - valueの値が左辺にbindされる
  - 2. `{:error, reason}`の場合
    - do-after句の処理を中断してerror処理を行う。OK libraryに応じて処理が異なる。
  - 例
  ```elixir
  <OK.library> do
  a <- {:ok, 100} # ok
  # a bind 100

  a <- {:error, "bad args"} # ok
  # but not bind, go to error handling line

  {:ok, v} <- {:ok, 100} # NG

  ...
  end
  ```


### ①OK.for

- 例

  ```elixir
  # OK result monad
  iex> OK.for do
  ...>   user <- {:ok, "snamiki"} # ok result monad
  ...>   result = user <> "1212"
  ...> after
  ...>   result
  ...> end
  {:ok, "snamiki1212"}
  
  # Error result monad
  iex> OK.for do
  ...>   user <- {:error, "snamiki"} # error result monad
  ...>   result = user <> "1212"
  ...> after
  ...>   result
  ...> end
  {:error, "snamiki"}
  ```

- 返り値

  `{:ok, value} | {:error, reason}`のどちらかのみ。

- do-after句がエラーがない場合

  after-endの間の値を`value`として、`{:ok, value}`の形で返す

- do-after句がエラーがある場合（`<-`の右辺にerror monadが来た時）

  `<-`の右辺を結果をそのまま返す

### ②OK.try

- 例

  ```elixir
  # OK result monad
  iex> OK.try do
  ...>   user <- {:ok, "snamiki"} # ok result monad
  ...>   result = user <> "1212"
  ...> after
  ...>   result
  ...> rescue
  ...>   e -> :here_is_rescue
  ...> end
  "snamiki1212"
  
  # Error result monad
  iex> OK.try do
  ...>   user <- {:error, "snamiki"} # error result monad
  ...>   result = user <> "1212"
  ...> after
  ...>   result
  ...> rescue
  ...>   e -> "here_is_rescue > " <> e
  ...> end
  "here_is_rescue > snamiki"
  ```

- 返り値

  resultモナドの形ではなく、要素のみで返す。(`{:ok, value} | {:error, reason}`ではない）

- do-after句がエラーがない場合

  after-rescueの間の値を*そのまま*返す。

- do-after句がエラーがある場合（`<-`の右辺にerror monadが来た時）

  右辺の`{:error, reason}`のreasonを元に、rescueにてpattern-matchingを行う。

  pattern-matchした行の右辺の結果を返す。



------------------------------------------

## Error handling

そもそも、error/exceptionのハンドリングの主要なやりかたは大きく分けて２つの方法がある。

1. monad
2. raise

わかりやすい例として、[Poison](https://github.com/devinus/poison)ライブラリで例にとる。

エンコード処理を行う関数`encode` は`Poison.encode/1` / `Poison.encode!/1`の2つが用意されている。

下記の通りとなる。

```elixir
# monad
iex>  case Poison.encode "asd" do
...>   {:ok, value} -> value
...>   {:error, value} -> value
...> end
"\"asd\"" # 処理が失敗しても、raiseしないで結果はresult monad形式でreturnするので、その結果をpattern-matchなどで補足して処理を分岐する

# raise
iex> try do
...>   Poison.encode! {1,2}
...> rescue
...>   e -> IO.inspect "error happen!!"
...> end
"error happen!!" # 処理が失敗したら、raiseするので、catch/rescueなどで補足して処理を分岐する
```

Elixirはfuncのreturnの形式をresult monadに強制することはなく、利用者にて好きな方を利用できるようなデザインが好まれる。
