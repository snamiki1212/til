## Content
mapから値を取り出す際は、
```elixir
iex(5)> map = %{a: 1, b: 10, c: 100}
%{a: 1, b: 10, c: 100}
iex(6)> map[:a]
1
iex(7)>
```

で`[]`アクセス演算子でデータにアクセスする
mapがnilでもnilでreturnしてくれる

```elixir
iex(10)> map = nil
nil
iex(11)> map[:abc]
nil
iex(12)>
```

パイプライン演算子で引き渡されたmapに対してアクセスをする際は、大抵　Map.get/3を行う。

```elixir
iex(14)> map = %{a: 1, b: 10, c: 100}
%{a: 1, b: 10, c: 100}
iex(15)> map |> IO.inspect |> Map.get(:a) |> IO.inspect
%{a: 1, b: 10, c: 100}
1
1
iex(16)>
```

Map.get/3はnilを渡すとexception errorとなる
```elixir
iex(18)> Map.get(nil, :abc)
** (BadMapError) expected a map, got: nil
    (stdlib) :maps.find(:abc, nil)
    (elixir) lib/map.ex:234: Map.get/3
iex(18)>
```

パイプラインで引き渡された値が nil or mapのどちらかがわからないケースのときはAccess.getを使うと解決する

```elxiir
iex(31)> map_list = [%{v: 1}, %{v: 10}, %{v: 100}]
[%{v: 1}, %{v: 10}, %{v: 100}]
iex(32)> map_list |> Enum.find(fn x -> x.v == 10 end) |> Map.get(:v)
10
iex(33)> map_list |> Enum.find(fn x -> x.v == 99 end) |> Map.get(:v)
** (BadMapError) expected a map, got: nil
    (stdlib) :maps.find(:v, nil)
    (elixir) lib/map.ex:234: Map.get/3
iex(33)> map_list |> Enum.find(fn x -> x.v == 99 end) |> Access.get(:v)
nil
iex(34)>
```

Accessはbehaiverなので、正直使いたくないが、よりよい方法が見つかるまでのTips
