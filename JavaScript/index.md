## Next.js

- Hot Module Reload：HMR
- /pagesが特殊ディレクトリ。この配下にあるComponent＝URLとマッチング。
- Method1: withLayoutで、HOCを作成して、HeaderなどはwithLayoutに封じ込める。
- Method2: propsにComponentを渡す。
- DynamicPageの場合は、URLは単一＋QueryParameterでページを制御。
  - →asで、URLの名前を定義できる。
- import { withRouter } from 'next/router';　→　props.router.query.title
- getInitialProps：Moduleの要素に代入。fetch系の処理をここで実施してくれる。

TODO: 次https://nextjs.org/learn/basics/styling-components



## for_of_vs_for_in

```javascript
// declare
list = [1,2,3]
list.name="asd"

// for...in
for(x in list) console.log(x)
0
1
2
name // <<<<<

// for...of
for(x of list) console.log(x)
1
2
3
```

## Array.length

- Array オブジェクトの比較を行ない、オブジェクトは違うので、not equalになる。

```javascript
[] === []
// > false

[].length === [].length
// > true
```