---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "[翻訳]EMPEX NYC Conference 2018 (Elixir/Erlang/BEAM): Keynote(Dave Thomas)"
# categories: [ "Study", ]
# tags: [ "Study", ]
---

## [翻訳]EMPEX NYC Conference 2018 (Elixir/Erlang/BEAM): Keynote(Dave Thomas)
下記動画の内容のメモと所感

- [(VIDEO)EMPEX NYC Conference 2018 - Dave Thomas](https://www.youtube.com/watch?v=6U7cLUygMeI&feature=youtu.be)


------

## Attention

英語とElixirの学習用メモなため、解釈に誤りがある可能性があります。

この内容は参考程度に押さえて基本的に[動画](https://www.youtube.com/watch?v=6U7cLUygMeI&feature=youtu.be)を参照してください。

------

## TL; DR

現状の`Elixir/Phoenix`のアーキテクチャに対しての下記の発表となる。

1. 問題提議

2. その解決方法の提案

   

解決方法は下記の通りの提案となる

- 考え方：Component Structure
- 実装：[Component](https://github.com/pragdave/component) / Noddy(発表内にて開発中と言及。2018/6/3時点で未公開)



## Content

### Problem

知っての通り`Elixir/Phoenix`は`Erlang`と`Rails`を元に作成されている。

ただ、いくつかの良くないところも継承してしまっているのが現状だ。



##### Naming  Application

`Application`という名称だが、`Erlang`からこの名称は持ってきたが失敗だ。

様々な意味を包括していて結局は何を指しているかがわかりにくい

![img](https://i.gyazo.com/cacd7687c99459fc5e906c6114086849.png)



##### Dupplication Configuration

コンフィグを他の`Application`にも持たせなければならない。

![img](https://i.gyazo.com/f374b5c59e3ea5aaacadc8ac19281d29.png)

上記の例で述べると`PaymentMaker`のコンフィグを`AppOne`/`AppTwo`に持たせないとならない。

もちろん行いたいのは`PaymentMaker`にのみコンフィグを持つことだ。



##### Dog food GenServer

`GenServer`の実装は１つの`Module`に３つの内容を含んでいる

1. `API`
2. `Server`
3. `Implementation`

わかりにくい。俗に言うdog food、つまりゴチャ混ぜなコードだ。

![img](https://i.gyazo.com/d5fc9488411c63bbb10409a297fe410b.png)

14:36



##### Bad Directory Design

![img](https://i.gyazo.com/cc8434e960743d04219c471535ad795d.png)

左が`Rails`で右が`Phoenix`だ。

ほぼ同じ構成になっている。ただ、なんで`lib`？

`wooble.ex`なんて大抵のprojectでは`hello world`が書いてあるだけなんじゃないか？

無駄が多すぎる。



![img](https://i.gyazo.com/71e6bf35f1c4d8f133bbf2f6ae5b5c62.png)




## Solution

##### New Naming Application

`Component structure`では下記のように提議していきたい。

1. `Library`  … `state`を持つような`process` がない
2. `Component` … `state`を持つような`process`がある
3. `Assembly` ... `configuration` であり、`Library` / `Component`を束ねた可搬的なひとまとめ

![img](https://i.gyazo.com/a685d57c2a209e2f90c8a306bf2ce6f6.png)22:23

![img](https://i.gyazo.com/91165e412395e35cbda066c39162b2c7.png)

23:01







##### Phoenix Component

 上の規則に従うと `Phoenix Application`ではなくて、`Phoenix Component`となる。

 また、`Phoenix`にビジネスロジックが何個あるかべきか？０個だ。

`Phoenix`は純粋な`View Layer`であるべきだ。

なぜなら　`Phoenix`は`Interface`であり、`Interface`に`Business Logic`は書かないだろ？

ビジネスロジックである実装は更にバックエンドに記述するべきだ。`Phoenix`は`WebServer`なんだ。

![img](https://i.gyazo.com/dbea2fe4e15e7b05b4cd3cc8020d6fe7.png)





##### Component as GenServer

例として１つのGenServerがある。

![img](https://i.gyazo.com/397bc22f3bf5187d50f52aed0c94c44f.png)

[Component](https://github.com/pragdave/component)を使えばこれだけで済む。

![img](https://i.gyazo.com/a9c25bbd42b80ae1456e64abe1564b69.png)

内部的には`GenServer`をジェネレートしているわけだが、コード量は劇的に減少するだろう。

そして、[Component](https://github.com/pragdave/component)を使って簡略化しても元のコードからは何も情報は失われていない。

以前として`GenServer`であるが、すべてを書く必要がなくなるわけだ。



##### Component Directroy Design

![img](https://i.gyazo.com/84f7080e3b710f8a954be484dde6749d.png)

なんでフォーマット用configファイルである`.formatter.exs`がtop levelにあって、実装したいメインプログラムである`stack.exs`がtop levelにないんだ？おかしくないか？


![img](https://i.gyazo.com/686696e82ee4352c80b41768397fac91.png)	

これで十分だろう。ただ、もし`stack.ex`が複雑になってきたらどうするかって？

![img](https://i.gyazo.com/b182704fc4b8f76370aec05148fdff82.png)

そのときになったらサブディレクトリを足して`popper.ex`や`pusher.ex`のように機能別にファイルを作っていく？違う。私は１つの`stack.ex`に収めたいんだ。



もし、`stack.ex`が複雑になってきたら？`component`レベルで分割するんだ。

つまり、数多の小さな`component`を組み合わせていくわけだ。

これによって、再利用性とメンテナンス性があがるはずだ



##### How To Deploymnet

![img](https://i.gyazo.com/6b72b908a067aa95a72937b3159724b0.png)



現状では、`component`で良いデプロイ方法は`Elixir` には存在しない。

紹介しよう！Noddyだ！デプロイメントには`Noddy`(`NODe Dynamic management`)を使う。

（ここでいうNodeはServer上で稼働しているErlangVM上のNodeで、Serverと考える）

- ロギング設定を一元管理
- 並列デプロイ
- `Node`毎にどの`Component`をデプロイするかを定義できる



## Conclude

`Elixir`での開発課題をより簡単にしていきたい。

最終的には誰もが３分で`Component`を作成してデプロイでき、そして他の開発者もその`Component`を再利用できる。そんな未来が来るだろう。



# 所感

- `GenServer`を書いたり読んだりするが、１つのファイルに対してどうしても手続き的なコード量が多くなってしまう問題は以前から感じていただけに、[Component](https://github.com/pragdave/component)が実用化されれば`GenServer`のコード量という問題点はかなり解決できるのではないか、と感じられた。

- `Component Structure`が導入されるためには、現状`Noddy`も作成中な上、既存の`Phoenix`の構造から大幅な変更が発生するため、導入障壁と所要時間のハードルが高そうに感じる。

  

  



