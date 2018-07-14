---
date: "2018-01-01"
last-mod: "2018-01-01"
title: "04_from-Python-to-Elixir"
# categories: [ "Event", "erlang-elixir-fest-2018" ]
# tags: [ "Poem", "erlang-elixir-fest-2018" ]
---

# from Python to Elixir



- ゲーム会の基本基盤



## python->elixir

 - なぜ？
   - python2020年問題→サポートがdjango2.0→python2系が終わる


## FW Phoenix ? 自作WAF?

 - phoenix辛い
   - なぜ？
   - マクロ辛い問題
     - 多段useのため、コード把握が厳しい
      - 書く量が少ないが、読む量が多くなる
    - 暫定は、Phoenixマスターを1人おいて、ごりおし。
    - 今後は、自作FWを作るかも
 - FWにおける問題は、Webアプリレイヤーではなく、DBへの処理レイヤー
 - 垂直分割
   - UserDB
   - GuildDB
 - 水平分割
   - シャーディング
 - Ecto
   - repo = Database
   - シャーディングに対応してないので作った
      - Yacto ライブラリ
## GAME Project Template to Library

 - 今までテンプレートを作っていたが、メンテ性が悪すぎるのでやめた
 - すべてライブラリ化。
 - 基盤チームとアプリチームで、メンテ者と使用者で分けれるようになった。


