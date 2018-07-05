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

### bytes-sizeが固定ケース

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

ただし、この記述だと文字列のlengthが事前にわかっている必要がある。

### bytes-sizeが変動ケース

例えば、上記のaft変数にpattern-matchされた値の前半部の`12`がzero-paddingされない`時間`の場合は`0`〜`9`の時は1桁になってしまう。

こういうケースは関数によるpattern-matchやcase文によるpattern-matchで処理を分岐させる必要がある

#### 無名関数

```elixir
iex> func = fn
...> <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(1)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
...> <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(2)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
...> end
#Function<6.99386804/1 in :erl_eval.expr/5>

iex> data12 = "2018-07-05T12-2"
"2018-07-05T12-2"

iex> data3 = "2018-07-05T3-2"
"2018-07-05T3-2"

iex> func.(data12)
["2018-07-05", "12", "2"]

iex> func.(data3)
["2018-07-05", "3", "2"]
```


#### case
````elixir
iex> case data12 do
...>   <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(1)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
...>   <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(2)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
...> end
["2018-07-05", "12", "2"]
````

#### function

```elixir
iex> defmodule M do \
...>   def parse(<<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(1)>> <> "-" <> <<mm::bytes-size(1)>>), do: [yyyymmdd, h, mm]
...>   def parse(<<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(2)>> <> "-" <> <<mm::bytes-size(1)>>), do: [yyyymmdd, h, mm]
...> end

iex> M.parse(data12)
["2018-07-05", "12", "2"]
iex> M.parse(data3)
["2018-07-05", "3", "2"]
```

## Reference
[Pattern-matching complex strings](https://thepugautomatic.com/2016/01/pattern-matching-complex-strings/)
