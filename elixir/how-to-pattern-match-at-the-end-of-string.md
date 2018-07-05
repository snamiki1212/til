## 終端文字列のpattern-match

`<>`を使用すればシンプルなpattern-matchで実現可能

```
iex> origin
"2018-07-05T12-2"

iex> "2018-07-05T" <> aft = origin
"2018-07-05T12-2"

iex> aft
"12-2"
```

## 終端文字列以外のpattern-match

終端文字以外は`<>`を使用したpattern-matchは行えない。

```elxiir
iex> origin
"2018-07-05T12-2"

iex> yyyymmdd<>"T"<>aft = origin
** (CompileError) iex:16: a binary field without size is only allowed at the end of a binary pattern
```

こういうケースは`<< >>`を使用してbinary-pattern-matchを行う

```elixir
iex> origin = "2018-07-05T12-2"
"2018-07-05T12-2"

iex> <<yyyymmdd::bytes-size(10)>> <> "T" <> aft = origin
"2018-07-05T12-2"
# yyyymmdd変数に、byes-size=10(桁)分をpattern-match

iex> yyyymmdd
"2018-07-05"

iex> aft
"12-2"
```
