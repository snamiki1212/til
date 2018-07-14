---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "about datatime"
# categories: [ "Study", ]
# tags: [ "Study", ]
---

## 基礎前提知識
- 例として日本の10:00に`DateTime`を表示すると
  - 標準時間：UTC: `2018/06/06T01:00:00+00:00`
  - 日本時間：JST: `2018/06/06T10:00:00+09:00`

## Tips

`string`から`DateTime`型などに変換する際に大抵`UTC`として変換される。

なので、`string`の時点で`Timezone`を`stirng`で追記しておくと出来上がったデータも`JST`として生成される


```elixir
datetime_str = "2018-06-06 10:00:00"
{:ok, datetime_ust} = Timex.parse(datetime_str            , "{ISO:Extended:Z}")
{:ok, datetime_jst} = Timex.parse(datetime_str <> "+09:00", "{ISO:Extended:Z}")

datetime_ust
# ~N[2018-06-06 10:00:00]
# 型がjst/ustで違うけど、重要なのは、timezoneが含まれているか　

datetime_jst
# #<DateTime(2018-06-06T10:00:00+09:00 Etc/GMT-9)>

```

# Reference
- https://hexdocs.pm/timex/basic-usage.html#content
