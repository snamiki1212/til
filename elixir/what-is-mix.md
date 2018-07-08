---
date: "2018-07-04"
last-mod: "2018-07-04"
title: "What is mix"
slug: "what-is-mix"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "mix"]
---

## mix

今まで毎日のように`mix`コマンドを使っていたが、改めてこれは何？を口頭で説明できなかったので整理

- 主要な役割
  1. compiler
  1. 依存性管理
  1. test実行
  1. 環境管理
- `task`という単位で機能を提供している
- `task`にはデフォルトで下記などが提供されている。もちろん、custom taskを定義できる。project毎に作成したり、自分用の便利taskを作っておくと捗る
  - project生成
  - compile
  - testの実行
  

## Reference

- [Introduction to Mix](https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html)
- [Elixir School - Mix -](https://elixirschool.com/ja/lessons/basics/mix/)
- [hex-doc Mix](https://hexdocs.pm/mix/Mix.html)
