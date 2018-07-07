## Circuit Breaker Design Pattern

> サーキット・ブレーカーという発想のベースにあるアイデアはとてもシンプルです。 プロテクテッドなコール関数をサーキット・ブレーカー・オブジェクトにラップし、そのオブジェクトがコールの結果をモニタリングするのです。

> サーキットブレイカーで設定している閾値に達してしまうと、サーキットブレイカーは自身の処理を切り替え（これをトリップというらしい

## Implementetion

- phoenix/ectoを使っていれば`timeout`はconfigで設定されているので、わざわざ実装を行う必要がない？
  （また、他の現代WAFなら大抵上記は設定されているので、同上？）
- WAFを使用しないスクラッチでのDBへのアクセスなどでは上記を利用することを想定しないといけない？

## Referencew

#### Circuit breaker
- ["CircuitBreaker" - Martin Fowler](https://martinfowler.com/bliki/CircuitBreaker.html)
- ["CircuitBreaker" - 日本語訳](https://github.com/sawanoboly/txt.sawanoboly.net/blob/master/contributes/circuit-breaker-pattern.md)
- [サーキットブレイカーパターン：連続して起こる同様の障害への対応策](http://nununu.hatenablog.jp/entry/2016/09/22/220000)

#### to use elixir
- [Automated Fault Tolerance using the Circuit Breaker Pattern](https://medium.com/teacherspayteachers/automated-fault-tolerance-using-the-circuit-breaker-pattern-3884f6e99133)
