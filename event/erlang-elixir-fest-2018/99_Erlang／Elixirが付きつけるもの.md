---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "99_Erlang／Elixirが付きつけるもの"
# categories: [ "Event", "erlang-elixir-fest-2018" ]
# tags: [ "Poem", "erlang-elixir-fest-2018" ]
---

# Erlang/Elixirが付きつけるもの -力武　健次-

## Intro

- OpenErlang20週年
  - Elixir/Erlangではなく、Beamと表現してほしい旨を受ける
  - Elixir/ Erlangでの融合の時期？

## Immutability 

### Erlangメリット

1. Immutability

2. ディープコピー

   リストのコピーは、参照ではない

3. 参照がない



### Erlangデメリット

- 遅い
  - 仮想VMが中間層に入っているので
  - 速度で問題が発生したタイミングで機械語を利用するように
    - また、１つの処理を呼び出すのに約数msかかる。

- 厳格な言語なので、Ruby/PHPのように、ゆるくは書けない



## 特徴

- 従来の言語の原則
  - 安全よりも効率
- ELixir/Erlangの思想
  - 効率よりも安全



 ## ALT Erlang

- LFE
- efene
- alpaca
- cloherl
- luerl



## 今後の展開

- Erlangの基本理念「ほどほどなのが良い」
  - 安全は高速化に優先
- 組み込み分野
  - GriSP
    - 組み込みの知識がなくてもErlangの知識があれば導入できる
    - 法律的に国内で利用できな
  - Nerves

- 全体的
  - 大規模クラスタ：昔は１００ノードどうする？だったが、今では１０００ノードどうする？
  - ブロックチェーン：
  - Gradual Type System：型検査
  - Language Server Protocol：エディタなどでのエラー発生を言語間でも統一する



## QA

- Q. なんでErlangはあの文法？
  - A. prologの影響?
  - A. ドイツ語が読める人間的には読みやすいとか?



## 所感

- 「効率よりも安全」を何度も強調していたのが印象深い
- 「Erlang/Elixirが早いということは絶対にありえない」と強調していたのも印象深い。おそらく一時期バズった記事で「Elxiirが早い」という記事が挙がった過去もあったので強調主張していたのかと思われ。

