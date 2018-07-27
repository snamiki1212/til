---
date: "2018-07-04"
last-mod: "2018-07-04"
title: "typespecs"
slug: "typespecs"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "typespecs"]
---

- 詳細は[この公式ドキュメント](https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax)を参照
- [厳格さ整理したgist](https://gist.github.com/snamiki1212/a3171cb8a0c4c667d30b27dfb308b448)
- 下記の通りの書き方も可能なので、gist更新。そもそもgistからこのmdに移動

```elixir
defmodule WithHash do
  @type planet :: :mercury | :venus | :earth | :mars | :jupiter | :saturn | :uranus | :neptune

  @spec age_on(planet, pos_integer) :: float
  def age_on(planet, seconds) do
    # 
  end
end
```

https://github.com/amuino/elixir_hash_vs_patterns/blob/master/lib/with_hash.ex
