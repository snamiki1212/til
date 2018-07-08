---
date: "2018-07-05"
last-mod: "2018-07-06"
title: "How to pattern match at the end of string"
slug: "how-to-pattern-match-at-the-end-of-string"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "pattern-match" , "binary-pattern-match"]
---

## 末尾文字列のpattern-match

`<>`を使用すればシンプルなpattern-matchで実現可能

```
iex> origin
"2018-07-05T12-2"

iex> "2018-07-05T" <> aft = origin
"2018-07-05T12-2"

iex> aft
"12-2"
```

## 末尾文字列以外のpattern-match

末尾文字以外は`<>`を使用したpattern-matchは行えない。

```elxiir
iex> origin
"2018-07-05T12-2"

iex> yyyymmdd<>"T"<>aft = origin
** (CompileError) iex:16: a binary field without size is only allowed at the end of a binary pattern
```

こういうケースは`<< >>`を使用したbinary-pattern-matchを行える

### binery-pattern-match
#### bytes-sizeが固定ケース

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

#### bytes-sizeが変動ケース

例えば、上記の「aft変数にpattern-matchされた値の`12`が、zero-paddingされない`時間`」の場合、その時間が`0`〜`9`の時は1桁になってしまう。

こういうケースは「関数によるpattern-match」や「case文によるpattern-match」などで処理を分岐させる必要がある

#### 無名関数

```elixir
iex> func = fn
...>   <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(1)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
...>   <<yyyymmdd::bytes-size(10)>> <> "T" <> <<h::bytes-size(2)>> <> "-" <> <<mm::bytes-size(1)>> -> [yyyymmdd, h, mm]
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

### `String.split/2`

上記ケースだと、どちらにしてもlengthが固定値になり融通が効かなくなるし、見た目もスマートな方法でない。
結局は、素直に文字列を分割してpattern-matchさせたほうがスマートになりそう。

```elixir
iex> data12 = "2018-07-05T12-2"
"2018-07-05T12-2"

iex> [yyyymmdd, aft] = String.split(data12, "T")
["2018-07-05", "12-2"]

iex> [h, m] = String.split(aft, "-")
["12", "2"]

iex> [yyyymmdd, h, m]
["2018-07-05", "12", "2"]
```

## まとめ
- 末尾文字列以外の文字列はbinary-pattern-matchで実現できるが、`String.split/2`を使用したほうがスマートになる

## Reference

- [Pattern-matching complex strings](https://thepugautomatic.com/2016/01/pattern-matching-complex-strings/)
