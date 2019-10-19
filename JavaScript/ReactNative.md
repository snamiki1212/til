# ReactNative

## Deeplink

Expo で作成したアプリの任意ページを Deeplink で開く。

- [XXX]→[Expo で作ったアプリ]というケース。
- ExpoClient の schema はの`exp://`なので、`exp:// + <path>`でアプリが開く。
- `<path>`が空なら、ExpoClient 自体が開く。

### ケース別

- 前提: ```<schema>://``` + <path> でアプリ内のページが開ける。(ex: `myapp://article/1`)
- local で開発しているとき
  - `exp:// + <host> + <port>`
  - host+port は、「ExpoClient の Home>Projects にある開発中のプロジェクトのとこ」「プロジェクトを開いている状態で Command+D で表示される画面」とかで確認できる
  - ex)`exp://wg-qka.community.app.exp.direct:80`
  - ex)`exp://127.0.0.1:19000`
- Dev とかの環境で確認するとき
  - アプリは ExpoClient の中、ホスティングは Expo のホスティング(expo の host 経由で自分のアプリが開く)
  - ex) `exp://exp.host/@community/with-webbrowser-redirect`
- Stg/Prod とか環境で確認するとき
  - アプリは ExpoClient の中ではない(standalone なアプリ)
  - ホスティングは Expo のホスティング
  - schema を自分で設定しておく
    ````json
    {
    "expo": {
      "scheme": "myapp"
    }
    }
    ```
### react-navigation

- `<path>`と`Screen`を紐付けてくれる
- configで `{path=/user, ScreenComponent=UserComponentScreen}`みたいに紐付けておくと、自動的にそのコンポーネントのスクリーンが表示されるようになる。
- REF: [react-navigation[(https://reactnavigation.org/docs/en/deep-linking.html)

### MEMO

- 一度`exp://`で Expo を開こうとして、cacnel を選択すると、以降なぜか開くことができなくなるので、一度、safari で他の文言で url バーで検索して、再度`exp://`をすると解決する。(safari のバグかな？)

- アプリ内の任意ページの表示

  ```shell
  # simulator > expo > アプリ、のpathが設定されている画面を表示
  xcrun simctl openurl booted exp://127.0.0.1:19000/--/guest/password-reset-update/74b6d8e9-e6c2-44c4-9b30-e0060a6081b1
  xcrun simctl openurl booted <path>

  # simulatorのsafari のURLバーにURIを突っ込んでもOK
  ```

---

REF: [Handling Deep Links with React Navigation](https://www.reactnativeschool.com/handling-deep-links-with-react-navigation)
