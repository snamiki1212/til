+++
date = "2018-02-09"
title = "Extending this logic"
slug = "extending-this-logic"
categories = [ "Post", "Metaphorsum" ]
tags = [ "Lamb", "Shell", "Bookcase", "Nothing" ]
+++


https://hexdocs.pm/elixir/Agent.html


## function
大別すると下記の6種類の操作が可能。
1. start系
    - link関係: `Agent.start_link/{2,4}`
    - 非link関係: `Agent.start/{2,4}`

2. stop系

    Agentのkill
  
3. get系

4. update系(同期的にデータ更新
    ```elixir
    iex(33)> Agent.get a, fn x -> x end
    9

    iex(34)> Agent.update a, fn x -> :timer.sleep 5_000; x+1 end, 6_000
    ## ここでsleep 5sが行われる
    :ok

    iex(35)> Agent.get a, fn x -> x end
    10

    ```


5. cast系(非同期的にデータ更新
    ```elixir
    iex(24)> Agent.get a, fn x -> x end
    5

    iex(25)> Agent.cast a, fn x -> :timer.sleep 10_000; x+1 end
    :ok  ## ここでsleep10sは行われないで、即時にreturnされる

    iex(26)> Agent.get a, fn x -> x end
    ** (exit) exited in: GenServer.call(#PID<0.97.0>, {:get, #Function<6.99386804/1 in :erl_eval.expr/5>}, 5000)
        ** (EXIT) time out
        (elixir) lib/gen_server.ex:737: GenServer.call/3
    ## Agent.castの実行待ちだが、sleep10sで、Agent.getがのwait_timeが5sなので、タイムアウト

    iex(26)> Agent.get a, fn x -> x end
    6  ## Agent.castの実行後なので、待ち時間が無いので即時に結果を受け取れる
    ```

