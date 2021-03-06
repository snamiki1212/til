## 01 [はじめに(公式doc)](https://jp.vuejs.org/v2/guide/) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/01_initial.html)

- Vue
  - 双方向バインディング
  - プログレッシブ・フレームワーク

- ディレクティブとは
  - Vueにて提供されているDOMの要素
  - `v-`から始まる

- ディレクティブの例（`v-<???>:<???>=<???>`）
  - `v-bind`：DOMに束縛
  - `v-for`：繰り返し
  - `v-if`：If操作
  - `v-on`：オン操作
  - `v-model`：双方向バインディング

- Vue構造体
  - el
  - data
  - methods

## 02 [Vueインスタンス(公式doc)](https://jp.vuejs.org/v2/guide/instance.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/02_vue-instance.html)

- WebComponentでなくて、VueComponentの理由
  - １：WebComponentは、まだブラウザの対応が低い
  - ２：既存のWebComponentに、さらに機能を載せている

- メモ
  - 慣習：`vm`=Vueインスタンス変数名
  - Vue構造体が持つメソッド・プロパティはプレフィクス付きで`$<名前>`となる

- ライフサイクルフック
  - レンダリングの一連のサイクル時にフックして呼ばれる関数群
  - オプションオブジェクトにて関数を渡す
  - オプションオブジェクト：`new Vue(<オプションオブジェクト>)`

## 03 [テンプレート構文(公式doc)](https://jp.vuejs.org/v2/guide/syntax.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/03_template.html)

- メモ
  - 二重括弧構文：Mustache構文
- ディレクティブの引数：`v-<directive>:arg`
  - ディレクティブの引数を鍵括弧で囲むと、動的にjsから値を取ってこれる：(ex) `v-on:[eventName]="doSomething"`
  - ディレクティブの引数には、Stringかnullのみ。nullだと、明示的にバインディングを削除
- 修飾子：Modifier
  - ディレクティブが特別な方法で束縛されるべき、ということを示す(ex)`.prevent`

- 省略記法：代表的なのは2つ
  - `v-bind:xyz` = `:xyz`
  - `v-on:click`=`@click`

## 04 [算出プロパティ(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/04_property.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/04_property.html)

- 算出プロパティ
  - Viewレイヤーで計算を行わないで、Vueのオブジェクトで計算を行うようにする仕組み。
  - オブジェクトのキー名：`computed`：バリューにて関数を記述。
  - リアクティブな依存関係が更新されたときにだけ、値が更新される→(ex)Dateは時間で値が変わるが、キャッシュされた値が表示
- メソッド
  - オブジェクトのキー名：`methods`：バリューにて関数を記述
  - 算出プロパティとは異なり、描画のたびに必ず関数を実行する

- 算出プロパティ：Computed-getter/setter
  - オブジェクトの内部に、更にオブジェクトを配置して、Getter・Setterを定義できる。(ex)`{get: functionGetter, set: functionSetter}`(function を定義する)
  - 値の取得＝getが経由される（`xxx`を表示するときに、getterが実行される）
  - 値の代入＝setが経由される（`xxx=123`などの、代入するときにSetterが実行される）
- watch
  - 算出プロパティなどでは表現できない非同期などで使う
- まとめ
  - computed→data：computedでdataの値へのアクセス可能なので、こっち推奨。
  - data→computed：dataからcomputedへのアクセスは直接は出来ないので、watchを元に行う。



## 05 [バインディング(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/05_binding.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/05_binding.html)

- Class
  - v-bind：`v-bind:class`にて、オブジェクトのkeyがクラス名。valueがtrueならクラスを持ち、falseならクラスを持たない。配列、三項演算子、オブジェクトも可能
  - Vueコンポーネント：クラスの追加可能
- Style
  - `v-bind:style`にて、スタイルの適用が出来る。直接オブジェクト記載、Vueのデータを参照、配列などが可能。



## 06 [v-if(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/06_if.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/06_if.html)

- template：非表示ラッパー専用要素
- `v-if`：真のときのみ、そのDOMが描画される
- `v-else`：直後に配置するときのみ、利用可能
- `v-else-if`：if-else文
  - 注意：内部の要素は使い回される→想定外の挙動の原因
  - keyを指定すると、別個の要素として、認識する。再描画で入力値などは破棄される。
- `v-show`：描画可否のハンドリング専用：CSSのdisplayでハンドリング：v-ifに比べて、表示／非表示の切り替えコストは低い。



## 07 [リストレンダリング(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/07_list-rendering.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/07_list-rendering.html)

- `v-for="item in items"`
  - inの代わりにofでもOK
  - `item` → `(value, key)` でイテレータを取得可能
  - リストだけでなく、オブジェクトも対象に実行可能。

- `v-for`を使うときは`key`を指定する
  - 理由：DOMをユニークにするため。
  - 反例：keyがないDOMは再利用されるため、意図しない挙動の原因になる。
  - 備考：`key`はDOMに展開されないので、普通には見えない

- Vueオブジェクトの動的な変更
  - 変更メソッド：Vueのオブジェクトが保持している値に対して変更を行うメソッド群。リアクティブにViewも変更される。ex(`set`)
  - つまり→無理やり代入などで変更してもリアクティブにViewに変更されない
- その他
  - 範囲付き`v-for`：数字を直接使える	
  - `v-for` vs `v-if`：同時は非推奨

## 08 [イベントハンドラ(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/08_event.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/08_event.html)

- Modifier：イベント修飾子
  - `.prevent`。（ex)`@click.prevent`。順序の通りに実行される。
- クリック修飾子：`v-on` ＋`keyup`
  - 特定のキーボードからの入力に対してのみ、イベントを発火するようになる。(ex) `v-on:keyup.enter`
- キーコード：非推奨
- システム修飾キー：ctrlなど



## 09 [form入力バインディング(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/09_form-binding.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/09_form-binding.html)

- `v-model`でバインディング。
- 修飾子
  - `.lazy`：遅延評価
  - `.number`：数字として認識
  - `.trim`：空白削除



## 10 [コンポーネント基礎(公式doc)](https://github.com/snamiki1212/til/blob/master/vue/official/10_component.html) / [自作サンプル](https://github.com/snamiki1212/til/blob/master/vue/official/10_component.html)

- プロパティ
  - コンポーネントに登録できるカスタム属性となる。→関数でいうところの引数。
  - `v-bind`で必要に応じて、値をバインドする。
- コンポーネント＝単一要素
  - コンポーネントは１つのDOM要素でなくてはならない。複数あるなら、ラッピングして親要素を１つ作成すること。
- イベントの、リスナとアクション
  - カスタム・イベントで動的に定義可能。
  - リスナ：`v-on:<eventName>=処理`
  - アクション：`$emit(<eventName>)`
- イベントとリスナ：例「子供①→親→すべての子供」の流れで処理を行う。
  - 「子供①」にてクリックをキックにカスタムイベントを発火：`@click=$emit('erlarge-text')`
  - 「親」にてイベントリスナーがキャッチ、処理を実行  (ex) `v-on:enlarge-text="font_size += 1 `
  - ステータスに変更が発生したので、親の配下の影響のある「すべての子」が再描画される（このケースの場合は単純にCSS変更なので、再描画ではないが）
- イベントにパラメータ付与
  - イベント：emitの第②引数にて、パラーメタを付与可能。(ex)`@click='$emit("e1", $x)'`
  - リスナ側①：`$event`にて、パラメータにアクセス可能。(ex) `@e1="p=p+$event"`
  - リスナ側②：関数の場合は、第1引数にて渡される。





