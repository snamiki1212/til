# ReactNative

## 実機からPCに繋げてAPI実行

- `localhost`だと、実機がPCのIPを解決できない。なので、PCのIPを取得して、APIのURLに差し替える

```shell
> ipconfig getifaddr en0

	inet 192.168.0.174 netmask 0xffffff00 broadcast 192.168.0.255

# `192.xxx.x.xxx`をコピペ

# `http://localhost:3000` から `http://192.168.1.1/login` などに変える（loginはプロジェクトのAPIによる）
```

- REF: `<addres>/login` でいけない？って話: https://forums.expo.io/t/can-expo-get-a-connection-from-localhost-my-local-server-using-expo-xde/3885/4
- REF: appのexportについて:  https://docs.expo.io/versions/v35.0.0/distribution/hosting-your-app/#heres-an-example-of-how-youd-do-1
- REF: debuggin-http: https://docs.expo.io/versions/v35.0.0/workflow/debugging/#debugging-http

## スタイル

- 文字の中央揃え
  - `textAlign: 'auto'`
  - REF: https://facebook.github.io/react-native/docs/text-style-props#textalign

