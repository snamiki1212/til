

# TypeScript

モジュール|説明
--|--
`tsc` | コンパイラ
`tsserver` | 言語サービス：vs-codeなどのエディタなどのためのツール群
`ts-node` | インタラクティブ形式のサンドボックス
`ts-loader` | webpackがtsを使う際に呼び出すTypeScriptAPI

MEMO

- トランスコンパイラ
- JavaScript の書き方のままで書ける AltJS
- 型推論
- 厳格さは設定ファイルで管理：厳しい〜緩いを設定ファイルで変更可能。一番緩くても型推論でJavaScriptより厳格になる。`tsconfig.json`


## 型について

| type    | code                                                         |
| ------- | ------------------------------------------------------------ |
| number  | `const x : number = 1;`                                      |
| string  | `const x : number = 'a';`                                    |
| boolean | `const x : boolean = true;`                                  |
| null    | `const x : null = null;`                                     |
| enum    | `enum Color { Red, Blue, Green}`<br />`const c1: Color = Color.Blue ## -> 1`<br />`const c2: string = Color[1] ## -> Blue` |

- any：すべてを許容する型

- void：返り値を意識しないもの

  - never：意図的な無限ループや、処理途中にて必ずthrowする場合、その関数は末尾まで決していかないので、そのことを明示するためのもの

  - object：オブジェクト

  - readonly：オブジェクトの要素の変更を許可しない

  - TypeAssertion：変数の型を、定義タイミングではなく、使われている箇所でチェックする。

  - 関数型：

  - ジェネリクス：型定義に対して引数のように動的に型を定義出来る。

    - ```
      interface X<A, B>{
          a: A;
          b: B;
        }
      const x : X<string, number> = {a: 'abc', b: 123}
      ```

    - 

  - symbol

  - null

  - undefinend

  - any

  - never

  - array
    Tuple | `const x : [string, number] = ['a', 1];`

- 共有体型
  - `let i : number | null = 2;`



```
// インターフェースを定義
interface User {
	name: string;
	age?: number; // age? は定義しないでもOK
}

const nash: User = {name: nash};


type Person = User;
//
```

