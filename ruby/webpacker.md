

## 背景
- アセットファイル群(js/css/image/etc)をバンドルしたい。
- Rails 5.0まではアセットパイプラインというRailsの独自FW利用していた。
- Rails 5.1+ではWebpackerという"WebpackをRoRでラップしたgem"を利用する。
- アセットパイプラインでは`app/assets`配下のファイルをバンドルする
- Webpackerでは`app/javascript`配下のファイルをバンドルする。
  - 指定は`config/webpacker.yml`で変更・指定可能。
  - `app/javascript`配下にcssも配置するのがデフォルトの置き場（きもい）
- アセットパイプラインからWebpackerへのツール変更はいま時点のフロントバンドルのデファクトがwebpackなので統合していくのが狙いだと思われる

## 概要

- binはRubyで書かれているが内部的にはnpm scriptを実行しているだけにすぎない。
- bin
  - `/bin/webpack`: production向けコンパイラ
    - `--watch`optionで監視実行化
  - `/bin/webpack-dev-server`: development向けコンパイルサーバ
- 開発時は`rails s`と合わせて`bin/webpack-dev-server`を実行しておく。エントリーポイントの`app/javascript/application.js`の更新を監視してバンドルを実行してくれる。


## Reference

- [rails/webpacker: Use Webpack to manage app-like JavaScript modules in Rails](https://github.com/rails/webpacker)
- [webpackerの導入・設定メモ - Qiita](https://qiita.com/tatsuyankmura/items/728e190b92e0370eefbb)
