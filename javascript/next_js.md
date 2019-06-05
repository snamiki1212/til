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
