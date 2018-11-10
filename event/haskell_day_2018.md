# Haskell Day  2018/11/10

[HaskellDay2018](https://haskell-jp.connpass.com/event/92617/)に行ってきたので、そのまとめ。

- 自分のHaskellのレベル感

  ちょっと前に少しHaskellは自習したが、今は全てを忘れた状態。なので初心者レベル。

- 自分の関数型言語のレベル感

  関数型言語のレベル感はElixirを業務で1年くらい、の経験なので、ブロークンな関数型はそれなりに使えるが、Haskellみたいな厳格な純粋関数型を使ったことがない。

というわけで、純粋なHaskellerではない目線での聴講

> 🔎: Haskellちょっと興味ある人向けのセッション
>
> 🔰: Haskell始める・始めている人向けのセッション
>
> 📙: Haskell入門書を読んでいる、あるいは終えた人向けのセッション

| No   | 発表者                                            | セッション                                                   |
| ---- | :------------------------------------------------ | ------------------------------------------------------------ |
| 1    | [igrep](http://github.com/igrep)                  | 🔰オープニング「作りながら学ぶHaskell入門」を使ったハンズオン |
| 2    | [khibino](https://github.com/khibino)             | 🔎Haskellを導入した話                                         |
| 3    | [nakaji-dayo](https://github.com/nakaji-dayo)     | 🔎Servantで実現する高速かつ安全なAPI開発                      |
| 4    | [syocy](https://github.com/syocy)                 | 🔎並列並行言語Haskell                                         |
| 5    | [syocy](https://github.com/syocy)                 | 🔎Dhall: Haskellの新たなキラーアプリ                          |
| 6    | [aiya000](https://github.com/aiya000)             | 🔰Semigroupとは？ Monoidとは？ 環とは？                       |
| 7    | [matsubara0507](https://github.com/matsubara0507) | 🔰Haskell で作る CLI                                          |
| 8    | [lotz](https://github.com/lotz84)                 | 📙gloss: 動かして遊んで学ぶHaskell                            |
| 9    | [fumieval](https://github.com/fumieval)           | 📙Liszt あるいは永続データ構造を真に永続させる方法            |



## 🔰オープニング「作りながら学ぶHaskell入門」を使ったハンズオン

手を動かす会。

stack / ghiとかを入れて、課題をクリアしていく。みんな静かに集中してやってたので、完全にもくもく勉強会だった。

## 🔎Haskellを導入した話とHRRの紹介

- [スライド](<https://htmlpreview.github.io/?https://github.com/khibino/haskell-day-2018/blob/master/presentation.html>)
- by [@khibino](https://twitter.com/khibino?lang=ja) （8年haskell選手!!!）
- 概要：Haskell導入した話と自作ライブラリ紹介

#### 1. Haskellを導入した話

perlに変わるグルー言語としてhaskellで置き換えた話

- 2008年ごろにて、言語の選定。候補はLisp / OCaml / Haskellとか。

- 2010年からhaskellを導入（GHC 6.8とかの時期。8.6じゃないよ

- 気付き：Haskellの良かったもの

  1. テキスト処理：ParserCombinarotが使いやすい

  2. プロセス制御：ビルドシステムとか

  3. マルチスレッド：STMがあるため

  4. DSL：定義しやすい

#### 2. 自作ライブラリ紹介

[khibino/haskell-relational-record](https://github.com/khibino/haskell-relational-record)

> Haskel Relational Record
>
> This repository includes a joined query generator based on typefull relational algebra, and mapping tools between SQL values list and Haskell record type.

HaskellによるクエリDSLを作成している話。売りは、合成可能／型安全とかとか。コンパイルが通れば正しいSQLであることが保証される。

#### QA

- Q. パフォーマンスでのハマりはあったか？

  A. メモリで苦労した。byte-stringをすべてメモリに入れたら問題が生じたので、short-byte-stringに変えた。経験的にHaskellはメモリでハマることが多い。が、適切なデータ構造に変換すると解決するケースが多いと思う。

- Q. Haskellにする選定記述の勘所は？

  A. グルー言語としてよく使う機能で、例えばParserとかが使いやすいか？とかが大事かと思う

#### 所感

- Haskell置き換えの話

  2008年からの話で歴史を感じた。また、それだけ、Haskellが歴史が長く、今でも実績が多くある言語というわけで、ナレッジもありそうだなーと感じた。

- ライブラリ

  HaskellのDSLが柔軟で強力と感じさせてくれる良い例の紹介だった。また、ライブラリの使い方を間違えると型エラーで検知できる感じがHaskellらしいように感じた。

## 🔎Haskell/Servantで実現する高速かつ安全なAPI開発

- [スライド](https://speakerdeck.com/daishi/servantdexing-uan-quan-katugao-su-naapikai-fa)
- by [@nakaji_dayo](https://twitter.com/nakaji_dayo?lang=ja)
- 概要：WebアプリケーションをHaskellで作成した話

#### 1.Haskell用途

- backend(API/BATCH)の開発
- 課金のあるSNS
- Backend：10人月くらい

#### 2.技術スタック

- **WAF: [Servant](https://github.com/haskell-servant/servant)**←今日の発表のメイン！！！

  Servantは薄いWAFでシンプルが売りな、Node/expressやRuby/sinatraみたいなもの。

- QueryBuilder：HRRを使用（←前の発表者が紹介していたライブラリ）

- Swagger / Mock：servant-swagger：swaggerからdocmentの生成ではなく、ライブラリからジェネレートする

- FW拡張

  ReaderモナドをServantのHandlerに合成することで、Handlerを拡張できる。

  型を使って制約を加えることが出来るので、副作用／DBアクセス／HTTP例外を投げない、などの可否を型のレイヤーで担保することが可能。

- 実装

#### 3. 気付き

- 型で担保できる範囲が多いのでバグを防げる

- 自明なテストをそもそも書かなくて良いので、ロジックに集中できる

- ライブラリが型安全である傾向がある

#### 4 .利用ライブラリの概要

- スライド参照

#### 5. まとめ（発表者のまとめ

- 安全＝型、副作用分離
- （実装が）高速＝自明なテストが不要
- 一般的なライブラリは十分に揃っている。

#### QA

- Q. 開発人数と教育方法は？

  A. エンジニア３人。経験者含めてペアプロしつつ、業務を通して学習

#### 所感

- 技術選定

  「Haskell = ロジック部分を担当する」という使われ方が一般的だというイメージだったが、Webアプリケーションでごりごりに書いている発表なので普段の業務にも近くイメージがしやすい面白い内容だった。

  ただ、「なんでHaskellを選択した？」の技術選定理由が発表中に無かった。もしあるなら、聞きたかった。

  今回、Haskell開発におけるメリットを色々発表されていたが、エンジニア市場／技術トレンド／リーンの検証速度／コミュニティ規模／etc...を考えると、Webアプリケーション開発においてはRuby・PHPなどのデファクトな言語を使うほうがやはりメリットが高く感じる。

- 副作用の制御や型安全の保証などがあるため、バグ混入率の低い安全性が高いアプリケーションが書けそうに見える。

## 🔎並列並行言語Haskell

- 概要：並列並行並列処理をHaskellで行う方法に関する知識の発表
- [スライド](https://github.com/syocy/haskell-day-syocy/releases/tag/v0.0.5)
- by [@syocy](https://twitter.com/syocy)

#### 1. 初めに

近年、SingleCoreによる性能が頭打ちになってきているためMultiCoreで性能を稼ぐ方法が一般化しているので、それに合わせて並列プログラミングも重要になっているよね？という観点のもとHaskellの発表。

- 上記理由により、近年のトレンドの言語も並列性は担保されているケースが多いように感じる（例：Go / Erlang(Elixir) / Rust）

- また、Haskell自体も言語コア設計のレイヤーで並行／並列処理が考慮されている。

#### 2. 並行Haskell

Haskellの標準にて「並行Haskell」というものが提供されている

- 「並列例は決定的」＝実行環境や並列度が変わっても結果が変わらない

- 言語レイヤーにて、軽量スレッドもサポートされている

- 2種類のスレッド間通信が存在

  1. MVer：特徴：アクセスの公平性を保証

  2. STM(Software Transactional Memory)：特徴：トランザクションによる読み書き

#### 3.並列Haskell

評価方法を指示することで並列を実現できる話

- 「評価順番」を明示出来る。
- 「評価戦略」

#### 4 ツール

- Par Monad：データフロー／パイプライン並列

- Haxl Monad：クエリを並列

#### 所感

- 本による座学的知識やネットに点在している情報をサマったような内容の発表、というような形だった。
- 自分のHaskell力が足りなくて発表の大筋しかわからなかったのは残念。Haskell
- 並行並列による切り口での発表として他の言語との比較などがあるとメリデメがわかりやすく、他の言語経験者としてもHaskellの理解が進むように感じた。

## 🔎Dhall: Haskellの新たなキラーアプリ

- 概要：[Dhall](https://github.com/dhall-lang/dhall-lang)についての発表
- [スライド](https://github.com/syocy/haskell-day-syocy/releases/tag/v0.0.5)
- by [@syocy](https://twitter.com/syocy)

#### 1. Dhallとは

> A configuration language guaranteed to terminate

設定ファイル言語

- 型・関数・インポートなどの機能がある
- 副作用／無限ループの危険がない

#### 2. 導入事例を考える

例えば現在だとk8sでは大量YAML問題が存在し、それにに対するYAML管理ソリューションの一つとして使える。Dhallファイルで設定ファイルを定義して、YAML/JSONにジェネレートする。

- `dhal-to-yaml` /`dhal-to-json` にてDhall→YAML／JSONに変換

他にも、自社事例で大量JSONをDhallで管理した、とのこと。

#### 所感

- 設定ファイル言語というジャンルを知らなかったので面白かった。
- 大量の設定ファイルを管理する痛みよりもDhallの使い方を学ぶコストの安い場合は、選択肢候の候補として良いかと思った。が、運用面での不安としてDhallを使える人が居なくなるとブラックボックス化する問題が発生しそうな怖さはやはりあるように感じる。Dhall自体の学習コスト次第かと思うが、そこらへんの言及が特に無かったので。


## 🔰Semigroupとは？ Monoidとは？ 環とは？

- [スライド](https://aiya000.github.io/Maid/haskell-day-2018-algebra/#/)

- 概要：代数をHaskellの型で表現してみる、的な発表
- by [@aiya](https://github.com/aiya000)

#### 1.代数の素朴な定義

- magma

  >  aに**閉じた演算**とはaの値だけを受け取ってaの値を返す

- semigroup：半群

  > マグマ + **左右どちらから演算して変わらない**

- Monoid：

  >  半群 + **単位元** e

- Group：群

  > モノイド + **任意の元に対する逆元** `x^-1`

#### 所感

- 代数力とHaskell力が足りなくて、なんとなくしかわからなかった
- Haskell自体が数学的概念を強く取り入れられているらしいので、代数をHaskellで定義するという今回みたいな試みは他の言語に比べて扱いやすいのかなー？と思った

## 🔰Haskell で作る CLI

- [スライド](https://www.slideshare.net/noob00/haskell-cli)
- 概要：初学者がCLIを作る際に参考にすべきナレッジをまとめた発表
- by [@matsubara0507](https://github.com/matsubara0507)

#### 1. コマンドライン引数

- CLIによる便利なやつらを紹介

#### 2. Alt Prelude: RIO

`Prelude`では窮屈に感じてきたら手を出すであろAltPreludeの一つの`RIO`を紹介　

- `stack`の開発チームが開発していて、このチームのベストプラクティスを詰め込んでる

#### 3. Stack Template

`stack new`した後に毎回やるであろうオレオレ作業はテンプレート化できる

- local参照だけでなく、git-repositoryから参照可能になった

#### 所感

- 「Haskellerなら型で何でもやりたい、と思うじゃないですか？」発言から感じる型に対する愛
- 業務でHaskell使ってないけど、趣味でやってるレベルでも発表できるよ！という良い発表者マインド

## 📙gloss: 動かして遊んで学ぶHaskell

- [スライド](https://qiita.com/lotz/items/bdb04c771efc8919b79c)
- 概要：自作ライブラリの紹介と内部実装説明
- by [@lotz84](https://twitter.com/lotz84_)

#### 1. Gloss

#### 2. ライフゲーム

#### 所感

- 後半の発表内容がむずかしい（白目）

## 📙Liszt あるいは永続データ構造を真に永続させる方法
- [スライド](https://assets.adobe.com/files/slides/2018-Liszt.pdf)
- 概要：自作ライブラリの紹介
- by [@fumieval](https://github.com/fumieval)



## まとめ：所感

- 発表内容

  発表者の内容の種類／レベル感が良い塩梅に散りばめられているのはとても良かった。

- 数学的概念

  「Haskellは数学的概念を強く取り入れられている」という説明を聞いたことがあったが、やはり発表者の多くが数学的な概念を説明中にナチュラルに発言されていたりするため、その面が強く感じた。

- 型によるプログラミング

  型安全／型推論／型をどうやって作成するか？などの話がとても多くあった印象。発表者の発言で「型ですべてを表そうとするのがHaskeller」的な言葉から、「Haskell＝型によるプログラミング」というパラダイムである、という理解がしっくり来た。
