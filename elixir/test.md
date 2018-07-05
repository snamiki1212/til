
## ExUnit
> Unit testing framework for Elixir

- [公式ドキュメント](https://hexdocs.pm/ex_unit/ExUnit.html)の説明が簡潔・具体列付き・短文で一番概要がわかりやすい。その上で詳細な使い方は[ExUnit入門](https://qiita.com/Joe-noh/items/ddd6cf3f38c8f841e90a)を見るとよさげ。

- async option

  `async`optionをtrueしているすると、非同期実行される。つまり、全テストが並列に実行される。
  ```
  ...
  use ExUnit.Case, async: true
  ...
  ```


## Phoenix

PhoenixでExUnitをwrappingして使われるので[Phoenix - Introduction to Testing](https://hexdocs.pm/phoenix/testing.html)を見ておくとPhoenix経由での使い方の概要がわかる
- `test/test_helper.exs`にてdatabaseのcreate/migrationを行う。`mix test`毎に行われるので、毎回のテストにてcleanされる。
- `test/support`配下のmoduleはテスト可能状態にするための機能群で、具体的にはコネクション確立やEctoChangesetのエラー発見？など
- mix commands

  ```terminal
  ## test all files
  mix test

  ## test all files under directory-path
  mix test <directory-path>

  ## test target file
  mix test <file-path>

  ## test target file and target line
  mix test <file-path>:<line>

  ## test with this tag
  mix test --only <tag>
  ```

### Ecto.Adapters.SQL.Sandbox

  EctoのAdapterの１つでテスト専用で使用するもの（Adapterは「適合させるもの」の意味のままの通りで、`Ecto`ライブラリと`Sandbox(PostgreSQL or MySQL)`を適合させる。他のAdapterには`MySQL`や｀PostgreSQLがある）

  > A pool for concurrent transactional tests.

- dbへの並列アクセスを安全に行うための機構
  - dbへの接続にてcheckoutを明示する
  - connectionをwrapしてる
- `manual` / `shared` の2modeがある。違いは下記の2点。
  1. cuncurently testable: テスト全体でテストの並列実行の可否
  2. explicit allowances: テスト前にcheckoutしたrepoへのアクセス権を、テスト中にspawnしたprocessに明示的に渡す必要があるか？
  
  |   | `manual`mode(Using allowances) | `shared`mode |
  |  ------ | ------ | ------ |
  |  cuncurently testable | 可能 | 不可能 |
  |  explicit allowances | あり | なし |


- サポート
  ```
  While both PostgreSQL and MySQL support SQL Sandbox, only PostgreSQL supports concurrent tests while running the SQL Sandbox. Therefore, do not run concurrent tests with MySQL as you may run into deadlocks due to its transaction implementation.
  ```
  - ◯：PostgreSQL
  - △：MySQL
  - 並列テストはPostgreSQLではサポートしてるけど、MySQLではサポートしていないので行うな。deadlockが発生するかもしれないから(v2.2.10時点)

## Reference
### ExUnit
- [公式ドキュメント](https://hexdocs.pm/ex_unit/ExUnit.html)
- [ExUnit入門](https://qiita.com/Joe-noh/items/ddd6cf3f38c8f841e90a)

### Phoenix / Ecto
- [Phoenix - Introduction to Testing](https://hexdocs.pm/phoenix/testing.html)
- [Ecto - Ecto.Adapters.SQL.Sandbox](https://hexdocs.pm/ecto/Ecto.Adapters.SQL.Sandbox.html)

### doctest
- [公式ドキュメント](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)（公式日本語訳は無かった）
- [Elixir の doctest 書き方まとめ](https://qiita.com/ma2ge/items/b6b26335ecc1b2181897)

