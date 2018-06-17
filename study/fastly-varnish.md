## 目的

CDN周りで

- fastly
- varnish

の単語をよく聞くようになったが、概念レベルにてきちんと理解をしておくための学習履歴メモ

## Fastly

> インスタント・パージとログのストリーミングができるという点、そして「Varnish」のVCL（Varnish Configuration Language）を使った配信設定のカスタマイズ性の高さですね。この3つが最大の特徴だと考えています。

1. instant purge
    
    キャッシュを即時に削除。従来のCDNではキャッシュ削除に時間を要していたが、マイクロ秒単位で実現可能に。また、この機能により、動的コンテンツのキャッシュの現実的な利用が実現可能になる。

1. VCL(Varnish Control Language)
    
    設定をDSLで制御。Fastlyの根幹基盤にてVarnish基盤使用しており、Varnishに対してVCLを使用することでC言語ライクに設定を行える。

1. Realtime Log Streaming
  
   アクセスログを瞬時に取得することができるため、リアルタイムでの傾向分析、障害把握が可能

## Varnish

- Fastlyのコア機能としてVarnishを使用している

Varnishとは？
```
> Varnish is an HTTP accelerator designed for content-heavy dynamic web sites as well as APIs
https://en.wikipedia.org/wiki/Varnish_(software)

> HTTP accelerator
>> A web accelerator is a proxy server that reduces web site access time.
https://en.wikipedia.org/wiki/Web_accelerator

> Varnish is a caching HTTP reverse proxy. I
https://varnish-cache.org/docs/trunk/tutorial/introduction.html

```

つまり、
  - 動的大規模コンテンツサイト／API向けのリバースプロキシサーバ
  - モダンなアーキテクチャを持ちつつパフォーマンスが意識された設計
  - OSS

## まとめ
- Fastlyは先進的な機能を数多く有しており技術的優位が高い
- Fastlyのコア機能となるのがVarnish基盤であるが、OSSであるためFastly経由ではなく自社／自身で導入することも可能

## Reference

- [Fastly BLog - The benefits of using Varnish- ](https://www.fastly.com/blog/benefits-using-varnish)
- [爆速サイトだけではない！Fastlyの中の人に聞く！エッジクラウドとしてのFastly活用法（前編）](https://cloud.nifty.com/navi/tech/fastly_1.htm)
- [爆速サイトだけではない！エッジクラウドとしてのFastly活用法（後編）](https://cloud.nifty.com/navi/tech/fastly_2.htm)

