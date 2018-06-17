## 目的

CDN周りで

- fastly
- varnish

の単語をよく聞くようになったが、概念レベルにてきちんと理解をしておくための学習履歴メモ

## Varnish

- Fastlyのコア機能としてVarnishを使用している

Varnishとは？
```
> Varnish is an HTTP accelerator designed for content-heavy dynamic web sites as well as APIs
https://en.wikipedia.org/wiki/Varnish_(software)

> HTTP accelerator
>> A web accelerator is a proxy server that reduces web site access time.
https://en.wikipedia.org/wiki/Web_accelerator

> Varnish is a caching HTTP reverse proxy. 
https://varnish-cache.org/docs/trunk/tutorial/introduction.html

```

つまり、
  - 動的大規模コンテンツサイト／API向けのリバースプロキシサーバ
  - モダンなアーキテクチャを持ちつつパフォーマンスが意識された設計
  - OSS

## Fastly
[Fastly](https://www.fastly.com/)社は既知の概念ではCDN業者だが、CDN業者として今まで出来なかったことをやってやる。ってスタンスみたい。


> Fastlyは便宜上CDNというくくりのサービスということにしていますが、「これまでのCDNができなかったことをやろう」というのが既存のCDNと発想が大きく異なるところです。

だからなのか、wikiも

> Fastly, Inc. is an American cloud computing services provider. 

となってる

### 特徴

> インスタント・パージとログのストリーミングができるという点、そして「Varnish」のVCL（Varnish Configuration Language）を使った配信設定のカスタマイズ性の高さですね。この3つが最大の特徴だと考えています。

1. instant purge
    
    - キャッシュを即時に削除
    - 従来のCDNではキャッシュ削除に時間を要していたが、マイクロ秒単位で実現可能
    - 従来では動的コンテンツをキャッシュ化してもコンテンツ更新後にキャッシュの更新に時間がかかっていたが、instant purgeにより、動的コンテンツをキャッシュ化する選択肢が生まれる

1. VCL(Varnish Control Language)
    
    - 設定をDSLで制御
    - Fastlyの根幹基盤にてVarnishを使用
    - VCLを使用することでC言語ライクの記述で柔軟な設定が可能
      - ただ、細く設定が行える分、深みまで行うと管理が難しいみたい
        > そんな感じで「VCL最高じゃん」ってなるんですけど、実際の開発はつらくて、なんかもう状態遷移がめちゃくちゃ複雑なんですね。
        > ..フローが難しく..
        > ..変数が限定的にしか使えない..
        > ..リクエストのレスポンスも本体のほうは見ることができなかった..
        > ..for文がないのでループできない..

1. Realtime Log Streaming
  
   - アクセスログを瞬時に取得することができるため、リアルタイムでの傾向分析、障害把握が可能


## まとめ
- Fastlyは先進的な機能を数多く有しており技術的優位が高い
- Fastlyのコア機能となるのがVarnish基盤であるが、OSSであるためFastly経由ではなく自社／自身で導入することも可能

  ただ、その分自分達ですべて実装するので当たり前だが技術難易度が高い（日経の記事でFastlyを使用しても？したから？大変だった旨が書かれてる）
  
  どちらにしても、仕事を利用する際は最初からVarnish-cacheで自前ですべて作らずに、Fastlyのサービスを利用して慣れてきてからのほうが良さそう。
  
  ただ、Varnish自体はOSSだし、Fastlyも無料枠があるので、ガンガンtryできる環境はある

## Reference

- [Fastly BLog - The benefits of using Varnish- ](https://www.fastly.com/blog/benefits-using-varnish)
- [爆速サイトだけではない！Fastlyの中の人に聞く！エッジクラウドとしてのFastly活用法（前編）](https://cloud.nifty.com/navi/tech/fastly_1.htm)
- [爆速サイトだけではない！エッジクラウドとしてのFastly活用法（後編）](https://cloud.nifty.com/navi/tech/fastly_2.htm)
- [CDNを使って表示速度を2倍に　日経電子版リニューアルの舞台裏](https://logmi.jp/282375)
