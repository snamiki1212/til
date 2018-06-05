## Commands

### Recopmile
```elixir
# recompile all files
iex> recompile

# recompile specific Module
iex> r Foo
```

### Renew iex
```elixir
iex> respawn
```

```elixir
# kill this iex process and wake up new iex process.
# to use respawn when doing 'pry' especially.
iex> self
#PID<0.23831.8> # <- before
iex> respawn

Interactive Elixir (1.4.2) - press Ctrl+C to exit (type h() ENTER for help)
iex> self
#PID<0.23927.8> # <- after
```

### Alias
```elixir
# alias
iex> alias Foo.Bar.Hoge, as: H

# to use
iex> H.xxx()
iex> r H
```

### View all params
```elixir
iex> binding()
```

```elixir
iex(1)> map = %{foo: 123, bar: 456}
%{bar: 456, foo: 123}
iex(2)> int_param = 999
999
iex(3)> string_param = "today i learned"
"today i learned"

iex(5)> binding()
[int_param: 999, map: %{bar: 456, foo: 123}, string_param: "today i learned"]
```


