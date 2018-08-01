---
date: "2018-07-04"
last-mod: "2018/08/01"
title: "typespecs"
slug: "typespecs"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "typespecs"]
---

[公式ドキュメント](https://hexdocs.pm/elixir/typespecs.html#types-and-their-syntax)や、コード見ていて知った型定義の方法をまとめ


- `@type <type name>`は型指定で使用する特殊な記法。慣習として、`<type name>`は`t`で記載されることが多い。

  - 例) `@type t :: :dev | :stg | :pro`
  
- `typespec`は厳格さを保証してくれない。厳格にさせたい場合は`Dializer`などを使う必要がある。ただし、実行自体に時間がかかるようなので、プロジェクト規模やメンバ感で相談して導入検討を行うとよいと思う

## 基本
### `map` typespec
- `map`としてtypespec定義
- 内部に何が入るかは、内部コードのロジックを追わないとわからない

```elixir
defmodule M1 do
  @spec sum(map) :: integer
  def sum(params) do
    %{a: a, b: b} = params
    a + b
  end
end
```

## よく使う

### `type attribute Struct`による`typespec`

- `type attribute`を実装した`Struct`を作成し、その`Struct`を`typespec`で定義
- `Struct`要素の型の責任を`Struct3`に持たせられる
  - 他の関数でも使い回しが行いやすい

```elixir
defmodule Struct3 do
  defstruct a: 999, b: 888
  @type t :: %Struct3{a: integer, b: integer}   
end

defmodule M do
  @spec sum(Struct3.t) :: integer
  def sum(params) do
    %{a: a, b: b} = params
    a + b
  end
end
```

### type attribute

- `type attribute`を使用して独自型を作成
- 同一の`Module`に定義できるので手軽に記載できる

```elixir
defmodule M5 do
  @type type :: :sum | :diff

  @spec calc(type, map) :: integer
  def calc(type, %{a: a, b: b} = _maps) do
    case type do
      :sum ->  a + b
      :diff -> a - b
    end
  end
end
```

## あまり使わない

### 詳細`map` typespec

- mapの内部構造をspecで定義
- cons：要素を`typespec`で定義するくらいなら、関数に直接定義したほうが厳格さも出せるので
  
```elixir
defmodule M2 do
  @spec sum(%{a: integer, b: integer}) :: integer
  def sum(params) do
    %{a: a, b: b} = params
    a + b
  end
end
```

### `Struct`で定義したtypespec

- `Struct`を作成し、その`Struct`を`typespec`で定義
- cons：要素を記載しないといけないので、複数関数で使い回すことが出来ないので

```elixir
defmodule Struct3 do
  defstruct [:a, :b]
end
defmodule M3 do
  @spec sum(%Struct3{a: integer, b: integer}) :: integer
  def sum(params) do
    %{a: a, b: b} = params
    a + b
  end
end
```

## `type attribute(引数あり)`のtypespec

- `type attribute`を実装した`Struct`を作成し、その`Struct`を`typespec`で定義
- `Struct2`の構造体は決まっているが、実行される関数によって要素の型や使われる要素が変動するケースで利用できる。ただ、記載が複雑だし、ここまで厳格に書くことは少ないと思うし、そもそも、そのようなケースの場合は、やはり引数に要素を明示して厳格さを保つほうがベターだと思う。


```elixir
defmodule Struct2 do
  defstruct [:a, :b]
  @type t(a, b) :: %Struct2{a: a, b: b}
end
defmodule M4 do
  @spec sum(Struct2.t(integer, integer)) :: integer
  def sum(params) do
    %{a: a, b: b} = params
    a + b
  end
end
```

