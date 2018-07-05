
## ExUnit
> Unit testing framework for Elixir

- [公式ドキュメント](https://hexdocs.pm/ex_unit/ExUnit.html)の説明が簡潔・具体列付き・短文で一番概要がわかりやすい。
  - その上で詳細な使い方は[ExUnit入門](https://qiita.com/Joe-noh/items/ddd6cf3f38c8f841e90a)を見るとよい。
- `use ExUnit.Case, async: true` => `async`指定で非同期実行される＝全テストが並列に実行される

## in Phoenix
- PhoenixでExUnitをwrappingしてるんで、[Phoenix - Introduction to Testing -](https://hexdocs.pm/phoenix/testing.html)も見ておくと概要がわかる
- `test/test_helper.exs`にてdatabaseのcreate/migrationを行う。`mix test`毎に行われるので、毎回のテストにてcleanされる。
- `test/support`配下のmoduleはテスト可能状態にするための機能群で、具体的にはコネクション確立やEctoChangesetのエラー発見？など

### mix commands
- `mix test`                      => test all files
- `mix test <directory-path>`     => test all files under directory-path
- `mix test <file-path>`          => test target file
- `mix test <file-path>:<line>`   => test target file and target line
- `mix test --only <tag>`         => test that has this tag

## Reference
### ExUnit
- [公式ドキュメント](https://hexdocs.pm/ex_unit/ExUnit.html)
- [ExUnit入門](https://qiita.com/Joe-noh/items/ddd6cf3f38c8f841e90a)
- [Phoenix - Introduction to Testing -](https://hexdocs.pm/phoenix/testing.html)

### doctest
- [公式ドキュメント](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html)（公式日本語訳は無かった）
- [Elixir の doctest 書き方まとめ](https://qiita.com/ma2ge/items/b6b26335ecc1b2181897)

