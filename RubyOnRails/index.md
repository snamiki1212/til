# Ruby on Rails

## Enum

Model に 列挙値を定義できる。

```ruby
# 定義
class User < ApplicationRecord
  enum status: {
        active: 0,
        nonactive: 1,
        deleted: 2
      }
end

# 使うとき user.active?
user = User.create(status: :active)
user.active?   # => true
user.unactive? # => false
user.deleted?  # => false

# 使うとき user.active
users = (3).map{|num| User.create(status: num == 1 ? :active : :unactive)
users.active.length   # => 1
users.unactive.length # => 2
users.deleted.length  # => 0

```

## `self` と `class << self`

- クラスメソッドかインスタンスメソッドか？
- `self.class` ならクラスメソッド、`self`ならインスタンスメソッド。
- `class << self`の中での定義はクラスメソッド、それ以外ならインスタンスメソッド。

REF
- https://qiita.com/suzuki_koya/items/1553c405beeb73f83bbc
- https://qiita.com/TakakiSato/items/6ae6395f7a7c7023ab4a

## `tap`

メソッドチェーンをつなげるために、「何かしらの処理」＋「返り値は自身のインスタンス」を実現するための関数

```ruby
irb(main):010:0> (1..5).tap{|a| p a.size}.select {|x| x%2==0 }
5
=> [2, 4]
```

REF
- https://rubikitch.hatenadiary.org/entry/20080502/tap

## ブロック / `{||}` / `&:`の書き方_シンタックスシュガー

```ruby
# 下記がすべて同じ

# インスタンスメソッドを実行したいときのショートハンド
irb(main):027:0> %i[a b c].map(&:upcase)
=> [:A, :B, :C]

# 一般的な書き方
irb(main):028:0> %i[a b c].map{|x| x.upcase}
=> [:A, :B, :C]

# 改行するなら、do-endブロックにすると良い
irb(main):029:0> %i[a b c].map do |x| x.upcase end
=> [:A, :B, :C]
```


## ブロック

「ブロック」は「ブロック」。プリミティブだと思うとわかりやすい。
- doで始まり、end で終わる部分 `do ~ end`や `do |x| ... end` みたいなの。
- ブロックは、変数に入れられない。（だから、余計にわかりにくい。。。）
- ブロックをオブジェクト化したものが、`Proc`。（これは変数に入れられる）
- ブロックをオブジェクト化する方法２が、`Lambda`。Procと微妙に挙動が違うけど、ほぼ同じ。

## Proc / Lambda

普通にruby 書いてると使うことはあんまりない。

```ruby
# proc の定義
proc1 = Proc.new do
  puts 'p1'
end

proc2 = Proc.new { puts 'p2' }

proc3 = Proc.new { |x| puts x } # 引数有り

# lambda の定義
lambda1 = lambda { puts 'lambda1' }
lambda2 = -> { puts 'lambda2' }
lambda3 = -> (text) { p text } # 引数有り

# proc/lambda を使う側
def a(block)
  p 'a start'
  block.call
  p 'a end'
end

a(proc2)
# > "a start"
# > p2
# > "a end"

a(lambda2)
# > "a start"
# > lambda2
# > "a end"
```

- REF: https://tomoyuki65.com/how-to-use-blocks-with-methods-in-ruby/

## rspec

- `describe` > `context` ...  > `it` > `expect` の順の階層
```ruby
describe 'x' do
  subject { 1 + 1 } # 主題。controller なら、get#index post#2とか。
  context 'y' do
    it 'z' do
      expect(subject).to eq(2)
    end
    # 
    context 'deep' do
      context 'more' do
        context 'moooore' do
          it { expect('ok').to eq('ok') }
        end
      end
    end
  end
end
```

- `shared_examples 'aaa'` >> `it_behaves_like 'aaa'` で期待値を共通化出来る
- `let`: 遅延評価のために使う。インスタンス変数は使わない。let!は早期評価

### controller

- controller の helper にて、 `current_user` が使える
- `.reload` をしないと、事前事後の結果のあとが更新されない
- change で事前事後を確認する
- 1つのsubject で複数確認するなら、`.add`でつなげる（複数回expect してはいけない）

```ruby
subject { post: :user }
it 'controller' do
  expect {subject} change {user.reload.images.length}.by(1)
    .add(
      {user.reload.images2.length}.from(1).to(2)
    )
end

```

- REF: https://qiita.com/jnchito/items/42193d066bd61c740612

## bundle exec

- Gemfile の依存解決した状態での実行を担保してくれるのが、`bundle exec <command>`
- `<command>` ex(irb)とかをすると、Globalにrequire されているPackage を使うので、依存解決が不整合を起こしてしまう。

- REF: https://qiita.com/diskkid/items/0d000a42df04c561ca0f

