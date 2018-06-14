

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


