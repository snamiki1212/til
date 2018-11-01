---
date: "2018-06-08"
last-mod: "2018-11-01"
title: "task"
slug: "task"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "Task"]
---

ほぼ[公式ドキュメントの意訳](https://hexdocs.pm/elixir/1.4.5/Task.html#await/2)になってるので基本的には原文参照を推奨

## Task

- 非同期で処理を行いたい場合かつ結果を利用したい場合に使用

  Spawn/send/receiveでも可能だが、これらの処理をラップしたものが、おそらくTaskの位置づけとなる。

- 複数非同期処理同士で関連性が無いかつ小規模処理のときに使用される位置づけ

- 注意点：`Task.await/2`の第2引数でwait timeを指定できる。defaultが5_000 milliseconds なので、重い処理を実行する場合は変更必須。

## 使い方

- Supervisorを使わない方法(①)

- Supervisorを使うなら、

  - 事前に定義しておいたTaskを実行する方法(②)

    または

  - 動的にタスクを宣言する方法(③)



### ① async and await

```elixir
## (1)非同期用に並列実行プロセスをcallして処理を渡す
task = Task.async(fn -> do_some_work() end)

## ...他の処理をおこなう
res  = do_some_other_work()

## (2)並列実行プロセスから結果を貰う
res + Task.await(task)
```

- `async`をする際は必ず`await`する
- asyncを実行したプロセス（caller）と呼ばれたプロセスは`link`関係
  - つまり、どちらかのプロセスがクラッシュしたらもう片方もクラッシュする
  - `link`関係にしたくなければ、`Task.start/1`や`Task.Supervisor`などを利用するように。



### ②Supervised tasks

```elixir
## Taskをuse
defmodule MyTask do
  use Task

  def start_link(arg) do
    Task.start_link(__MODULE__, :run, [arg])
  end

  def run(arg) do
    # ...
  end
end

## wakeup
Supervisor.start_link([MyTask])
```

Task ModuleをuseしたModuleを作成して、Supervisorで起動することで、childにいるTaskとTaskが呼び出す関数を実行する方法

①との違い

- Moduleを作成する必要があるため、手軽さがなくなる
- SupervisorにTaskの死活状態を管理させられるので、Task処理がクラッシュしても、メインプログラムも合わせてクラッシュされない

### ③ Dynamically supervised tasks

(1) お手軽に書く

```
## (i)Supervisor起動
{:ok, pid} = Task.Supervisor.start_link()

## (ii) Task実行
task = Task.Supervisor.async(pid, fn ->
  # Do something
end)

## (iii)Task実行結果取得
Task.await(task)
```

(2)厳格に書く

```elixir
## (i) <MyApp.TaskSupervisor>などの、Task.Supervisorをuseする独自Moduleを作成

## (ii)起動定義
Supervisor.start_link([
  {Task.Supervisor, name: MyApp.TaskSupervisor}
])

## (iii)起動
Task.Supervisor.start_child(MyApp.TaskSupervisor, fn ->
  # ...Do something...
end)

## (iv)Task実行および実行結果取得
Task.Supervisor.async(MyApp.TaskSupervisor, fn ->
  # Do something
end) |> Task.await()

```

 

##  Distributed tasks

Nodeを跨いだ動的なTaskの生成が可能 



## まとめ

- 返り値を必要とする並列処理を書く際に自分で実装する場合はspawn/send/receiveを駆使して実装しないといけない。汎用的な並列処理結果の受け取り可能な`Task`モジュールのおかげでそのあたりの実装が不要

- 使い分け

  - 返り値を必要とする　並列処理を行いたいは `Task.async/1`/`Task.await/1`

  - 返り値を必要としない並列処理を行いたいは `Task.start/1`

    （内部的にspawnを呼んでいるだけなので、spawnでも良いかも？優位点がわからない。オーバヘッドかかるだけなら、spawnを使うが）

  



