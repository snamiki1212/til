---
date: "2018-08-28"
last-mod: "2018-08-28"
title: "functional-programming"
slug: "functional-programming"
categories: [ "TIL", "FP" ]
tags: [ "TIL", "FP"]
---

## 勉強方針

- 概念理解
- 高階関数
  
  勉強のために0から作る。

- 言語特有
  
  その言語特有の強みなどについて。ElixirならGenServer(Erlang/OTP)など  

## 関数型について

- Lamda(ラムダ式)

  無名関数。関数名を省くことで、関数名を抽象化。

- side effect(副作用)
- Stream(無限列)
- Higher-order function(高階関数)
- pure(純粋)
- ReferencialTransparency(参照透過性)
- Monad
- bind vs substitue(束縛と代入の違い)
- ???(破壊的代入・再代入)
- pattern matching(パターンマッチング)
- currying(カーリー化)
- partial application(部分適用)
- recursive(再帰)
- Tail-call optimization(末尾最適)

## Monad
  - Fanctor
  - Applicative
  - Monad

## その他用語

- セマンティクス
  意味論。シンタックスで表されているコードが処理系にてどのようにて処理されるか？の箇所。

- シンタックス
  構文

- Context(式)
  戻り値があるようなもの。

- Express(文)
  戻り値がないようなもの。
 
- Evaluation Strategy(評価戦略)
- Lazy evaluation(遅延評価)
- Eager evaluation(積極評価)
- thunk(サンク)

  計算予定の未評価オブジェクト
