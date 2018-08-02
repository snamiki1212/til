---
date: "2018-08-02"
last-mod: "2018-08-02"
title: "how to work sleep feature"
slug: "how-to-work-sleep-feature"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "sleep"]
---
## まとめ

- `:timer.sleep/1`も`Process.sleep/1`も実装コードはまったく同じなので、どちらを使っても良い。
  - 個人的には、Erlangモジュールを直接呼び出すよりもElixirModuleを呼ぶほうが心理的な抵抗が少ないので、`Process.sleep/1`の方がおすすめ
- 実装は`receive`の`after`blockで行っている。
  - `after`blockでsleepする時間だけwaitする
  - `do...end`blockは記載しない  

## Reference
- [Elixir - Process.sleep](https://github.com/elixir-lang/elixir/blob/v1.7.1/lib/elixir/lib/process.ex#L225)
- [Erlang - timer.sleep](https://github.com/blackberry/Erlang-OTP/blob/master/lib/stdlib/src/timer.erl#L149)
