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
2. 呼び出した関数のresult monads返り値の変数へのbindを省略化
3. 呼び出した関数がerror monadだったときのエラー処理の最適化

## How to use OK Library
...ここに続き書く


---

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
