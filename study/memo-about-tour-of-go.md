---
date: "2018-07-14"
last-mod: "2018-01-01"
title: "memo about A Tour of go"
# categories: [ "Study", ]
# tags: [ "Study", ]
---

## 
- [A tour of go](https://go-tour-jp.appspot.com/basics/)を呼んだ結果の雑なまとめ
- [The Go Playground](https://play.golang.org/)＝実行環境

## Memo

- package
  
  名前空間のこと

- Exported name

  > 最初の文字が大文字で始まる名前は、外部のパッケージから参照できるエクスポート（公開）された名前( exported name )です

- function

  ```go
  func <func_name>(<arg_name> <arg_type>, ...) <return_type> {
    // ...
  }

  func add(atai1 int, atai2 int) int {
      return atai1 + atai2
  }
  ```

- Multiple results

  > 関数は複数の戻り値を返すことができます。

- Named return values

  > Goでの戻り値となる変数に名前をつける( named return value )ことができます。
  
  ```go
  func split(sum int) (x, y int) {
    // ...
  ```
  
- variables

  > var ステートメントは変数( variable )を宣言します。 関数の引数リストと同様に、複数の変数の最後に型を書くことで、変数のリストを宣言できます。

  ```go
  ...
  	var i int
  ...
  ```
  

- Short variable declarations

  > 関数の中では、 var 宣言の代わりに、短い := の代入文を使い、暗黙的な型宣言ができます。

  ```go
    // 宣言していないが、int型で保存
  	k := 3
    // intなら再代入可能
    k = 4
    // 型は変えられない
    k = "4"
    prog.go:8:6: cannot use "4" (type string) as type int in assignment
  ```
  
-  If with a short statement

    ```go
      if <short-statement>; <if-condition> {
        // ...
      }
    ```

    ```go
      if v := math.Pow(x, n); v < lim {
        // ...
      }
    ```  


- switch
  
  > Go では選択された case だけを実行してそれに続く全ての case は実行されません。
  
  > 条件のないswitchは、 switch true と書くことと同じです。

- defer
  
  > defer ステートメントは、 defer へ渡した関数の実行を、呼び出し元の関数の終わり(returnする)まで遅延させるものです。
  
  > defer へ渡した関数が複数ある場合、その呼び出しはスタック( stack )されます。 呼び出し元の関数がreturnするとき、 defer へ渡した関数は LIFO(last-in-first-out) の順番で実行されます。
  
- Pointer
  
  > Goはポインタを扱います。 ポインタは値のメモリアドレスを指します。

    > & オペレータは、そのオペランド( operand )へのポインタを引き出します。
  
    > * オペレータは、ポインタの指す先の変数を示します。

  > なお、C言語とは異なり、ポインタ演算はありません。

- struct

  - structのフィールドは、ドット( . )を用いてアクセスします。


  ```go
  // out function
  type Vertex struct {
    X int
    Y int
  }
  ```

- Struct Literals

  > structリテラルは、フィールドの値を列挙することで新しいstructの初期値の割り当てを示しています。

  ```go
  // out function
  var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p  = &Vertex{1, 2} // has type *Vertex
  )
  ```

- Arrays

  ```go 
  var a [10]int
  ```

  > 配列のサイズを変えることはできません。 

- Slices

  - 可変長
  
  ```go
  a[1:4]
  ```

  最初は可変長の型のarrayだと考えておくとわかりやすい。実態は違うみたいだけど。
  
  > スライスは配列への参照のようなものです。

  > スライスは長さ( length )と容量( capacity )の両方を持っています。
  > スライス s の長さと容量は len(s) と cap(s) という式を使用して得ることができます。

  - Creating a slice with make
  
    > スライスは、組み込みの make 関数を使用して作成することができます。 
    > これは、動的サイズの配列を作成する方法です。
    
  > スライスは、他のスライスを含む任意の型を含むことができます。

  - Appending to a slice

  > スライスへ新しい要素を追加するには、Goの組み込みの append を使います。
  
  ```go 
  func append(s []T, vs ...T) []T
  // 最初のパラメータ s は、追加元となる T 型のスライスです。 残りの vs は、追加する T 型の変数群
  ```

- Range

  > for ループに利用する range は、スライスや、マップ( map )をひとつずつ反復処理するために使います。

  ```go
   var list = []string{"a", "b", "c", "d"}
   for k, v := range list {
     //
   }
  ```

- map

  - 型

  > map はキーと値とを関連付けます(マップします)。

  - Map literals

    ```go
    var m = map[string]Vertex{
      "Bell Labs": Vertex{
        40.68433, -74.39967,
    },
   ``` 

  - syntax


  ```go
  // get 
  elem = m[key]

  // delete
  delete(m, key)

  // exist?
  elem, ok = m[key] // もし、 m に key があれば、変数 ok は true となり、存在しなければ、 ok は false となります。
  ```


- Function values

  > 関数も変数です。他の変数のように関数を渡すことができます。
  > 関数値( function value )は、関数の引数に取ることもできますし、戻り値としても利用できます。


次、Methodsから見る
