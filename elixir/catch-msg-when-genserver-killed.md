---
date: "2018-06-20"
last-mod: "2018-06-20"
title: "Catch msg when gen-server killed"
slug: "catch-msg-when-genserver-killed.md"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "GenServer" ]
---

## How to

1. SET TO SEND TERMINATE MESSAGE
  ```elixir
  ## GENSERVER
    def init() do
      ## ...
      Process.flag(:trap_exit, true)
      ## ...
    end
  ```

2. Kill PROCESS
3. CATCH
  ```elixir
    def terminate(reason, state) do
      Logger.info("#{inspect(__MODULE__)} >> terminate| reason: #{inspect(reason)} | state: #{inspect(state)}")
    end
  ```


