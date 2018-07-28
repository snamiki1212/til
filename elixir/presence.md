---
date: "2018-07-28"
last-mod: "2018-07-28"
title: "Presence"
slug: "Presence"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "Presence" ]
---

## [Phoenix - hex - doc - Phoenix.Presence behaviour](https://hexdocs.pm/phoenix/Phoenix.Presence.html)を読んだ結果のまとめ

- topic毎のpresence(出欠席＝join/leave)をリアルタイムに管理
- 実装の流れ

  1. `Phoenix.Presence`をuseしたModuleを実装
  2. MyAppのsupervisor-treeに登録して起動
  3. MyChannelにてMyPresenceを実行(MyPresence経由でPhoenix.Presenceで用意されているfunctionを実行)

## Reference
- [Phoenix - hex - doc - Phoenix.Presence behaviour](https://hexdocs.pm/phoenix/Phoenix.Presence.html)    
