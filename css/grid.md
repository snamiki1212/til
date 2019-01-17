## Grid Layout
- 関係
  - 親： container
  - 子: item
- 要素
  - 線: grid
  - 行列: 位置: track
  - 面: 単位: cell: 最小単位。
  - 面: 集合: area: cellにてareを構成する。

- CSS
  - 単位: fr = 「残りの幅」

## CSS
- 方法A
  - 親
    - `grid-template-rows`: 行のトラックの高さを半角スペースで区切って指定
    - `grid-template-columns`: 列のトラックの幅を半角スペースで区切って指定
  - 子
    - `grid-row`: 行の位置をグリッドNoで指定
    - `grid-column`: 列の位置をグリッドNoで指定
      - ex
        - ` 1 / 2 `(=1~2)
        - `2` (=2~3)
        - `3 / span2` (=3~5)
- 方法B
  - 親
    - `grid-template-area`: エリア毎に命名
  - 子
    - `grid-area`: エリアを指定
    
## Reference

- [CSS Grid Layout を極める！（基礎編） - Qiita](https://qiita.com/kura07/items/e633b35e33e43240d363#4-%E4%BB%8A%E3%81%BE%E3%81%A7%E3%81%A8%E4%BD%95%E3%81%8C%E9%81%95%E3%81%86)
- [CSSグリッドレイアウトで、サイズが違う複数のボックスをタイル状に配置する | Webクリエイターボックス](https://www.webcreatorbox.com/tech/css-grid-layout)
