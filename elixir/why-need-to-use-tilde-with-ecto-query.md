---
date: "2018-06-21"
last-mod: "2018-06-21"
title: "Why need to use tilde with ecto query"
slug: "why-need-to-use-tilde-with-ecto-query"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "Ecto"]
---

### Content

`Ecto`モジュールでsql apiを使用するとき、変数を使う場合は`^`(pin operator)が必要になる。

- `^`をつけると、その値はエスケープ処理される。
- 理由として、sql injection対策のために変数を参照する場合、それがユーザから渡される値であるかどうか、のジャッジのために大きくスコープを取って
「ハードコードではなく、変数に格納された値が引き渡される場合はユーザから引き渡される値の可能性が1%でもありうる＝SQLインジェクションの可能性がある」
という理屈のもととなる。

``` elixir
last_name = "Smith"
Friends.Person |> Ecto.Query.where(last_name: ^last_name) |> Friends.Repo.all # ^が必要　
Friends.Person |> Ecto.Query.where(last_name: "namiki")   |> Friends.Repo.all # ^が不要 
```




https://hexdocs.pm/ecto/getting-started.html#filtering-results
https://github.com/elixir-ecto/ecto/issues/180
