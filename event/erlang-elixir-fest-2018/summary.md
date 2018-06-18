
## TL;DR

2018/06/16に行われた[Erlang & Elixir Fest 2018](https://elixir-fest.jp/)の発表内容についてサマっておきました。
基本的には発表社達のオリジナルをご自身で見てほしいですが、いかんせんカンファレンスの動画が無く、当日に休日対応していた同僚もいることもあり、
発表中に口頭補足されていたところや、私自身の所感も合わせて書かせていただきます。
Elixir/Webエンジニア弱者なので、指摘事項などがあればコメントいただけると助かります。

冒頭での司会の方が述べられていた今回と去年のカンファレンスの内容についての傾向です。
  - 2017: これから開発が始まる系が多い
  - 2018: 実際に使った結果や運用面での話系が多い

## SLIDE

1. 「らくらく連絡網」が Elixir でリアルタイムメッセージング基盤を刷新した話
2. [初めてのErlangサーバ開発と運用](https://speakerdeck.com/mookjp/chu-metefalseerlangsahakai-fa-toyun-yong?slide=1)
3. [Phoenixアプリケーションを1年間運用して分かったこと](https://speakerdeck.com/kanmo/keep-phoenix-app-productivity?slide=1)
4. from Python to Elixir
5. [ステートフルで大規模アクセスのあるsoft-realtimeなゲームサーバーをeasyにつくる](https://speakerdeck.com/ne_sachirou/sutetohurudeda-gui-mo-akusesufalsearusoft-realtimenagemusabawoeasynitukuru?slide=1)
6. [Channel先生...!! PubSubがしたいです...](https://speakerdeck.com/ohr486/erlangelixirfest2018-ohr486-session)
7. Antikythera Framework: An Elixir framework for multiple web services
8. [任意のBEAM系言語でプラグインを書ける安定したフレームワークの作りかた](https://niku.name/2018/06/16/slide.html)
9. [Erlang 事例紹介: メディアストリーム中継システム](https://niconare.nicovideo.jp/watch/kn3115)
10. [Erlang and Elixir Fest 2018 Keynote](https://speakerdeck.com/jj1bdx/erlang-and-elixir-fest-2018-keynote)


## 全体を通した所感とか
- 登壇内容またはQA内容で
  - `クラスタ化` vs `非クラスタ化`
  - hot-deployを行う？
  
  の話が多かったが、大抵
  `非クラスタ化` / `hot-deployはしない`
  の選択肢をとる人が多かった。
  その理由も「大変」「時間がない」「複雑になる」「面倒」etcなので、
  現状では費用対効果的にここまで作り込むフェーズのサービスが少ない、または、これらの機能の技術的洗練が足りていない段階の可能性があるのかもしれない、と感じた。
  
- 記憶に残ったワード
  カンファレンスに行った人ならわかる内輪ネタが多くて恐縮ですが。
  - これから始める人に必要なもの　英語・根性
  - 「お前disれるほどPhoenixを使ってんの？」
  - （PubSubのSupervisorTree見ながら）「どうです？かっこよくないです？」
  - 効率よりも安全
  - Elixirは早くない
  - Erlang in Anger
  - Elixirﾁｮｯﾄﾃﾞｷﾙ人
  - 1週間でElixirを完全に理解した

- [Erlang in Anger](https://www.erlang-in-anger.com/)の話が多すぎて、これを機に[日本語訳化が行われるかもしれない](https://twitter.com/seizans/status/1008263285559312384)ので、逆に今読むのは待ったほうが良いかも


## HANDS ON

ErlangElixirFestHandsOn

- [github](https://github.com/ohr486/ErlangElixirFestHandsOn)

- [slide](https://www.slideshare.net/ohr486?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideview)


## Twitter
- [#elixirfestjp](https://twitter.com/hashtag/elixirfestjp?f=tweets&vertical=default&src=hash)


