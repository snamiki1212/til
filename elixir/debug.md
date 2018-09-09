---
date: "2018-06-03"
last-mod: "2018-09-09"
title: "Debug Tips"
slug: "debug-tips"
categories: [ "TIL", "Elixir" ]
tags: [ "TIL", "Elixir", "Debug" ]
---

# IO

## `IO.inspect/1`

```elixir
iex(1)> IO.inspect "test-message:0001"
"test-message:0001"
"test-message:0001"

iex(7)> 1..10 \
...(7)> |> Enum.map(&(&1*&1)) \
...(7)> |> IO.inspect(label: "point_0001") \
...(7)> |> Enum.map(&(&1+10000))
point_0001: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[10001, 10004, 10009, 10016, 10025, 10036, 10049, 10064, 10081, 10100]
```

## `IO.warn/1`

stderr

```elixir
iex(8)> IO.warn "test-message"
warning: test-message
  (stdlib) erl_eval.erl:670: :erl_eval.do_apply/6
  (elixir) src/elixir.erl:229: :elixir.erl_eval/3
  (elixir) src/elixir.erl:217: :elixir.eval_forms/4
  (iex) lib/iex/evaluator.ex:182: IEx.Evaluator.handle_eval/6
  (iex) lib/iex/evaluator.ex:175: IEx.Evaluator.do_eval/4

:ok
iex(9)>
```

# PRY

## `require IEx;IEx.pry`

1. write `require IEx;IEx.pry`

2. connect iex

```shell
# example
> iex -S mix phx.server
```

3. execute this code.


4. catch iex

```elixir
Request to pry #PID<0.512.0> at FchatWeb.PageController.index/2 (lib/fchat_web/controllers/page_controller.ex:5)

    3:
    4:   def index(conn, _params) do
    5:     require IEx;IEx.pry
    6:     render(conn, "index.html")
    7:   end

Allow? [Yn] y
pry(1)> # start to console debug 
```

### helper func

- `whereami/0`
```elixir
pry(1)> whereami
Location: lib/fchat_web/controllers/page_controller.ex:5

    3:
    4:   def index(conn, _params) do
    5:     require IEx;IEx.pry
    6:     render(conn, "index.html")
    7:   end

    (fchat) lib/fchat_web/controllers/page_controller.ex:5: FchatWeb.PageController.index/2
    (fchat) lib/fchat_web/controllers/page_controller.ex:1: FchatWeb.PageController.action/2
    (fchat) lib/fchat_web/controllers/page_controller.ex:1: FchatWeb.PageController.phoenix_controller_pipeline/2
    (fchat) lib/fchat_web/endpoint.ex:1: FchatWeb.Endpoint.instrument/4
    (phoenix) lib/phoenix/router.ex:278: Phoenix.Router.__call__/1
    (fchat) lib/fchat_web/endpoint.ex:1: FchatWeb.Endpoint.plug_builder_call/2
    (fchat) lib/plug/debugger.ex:122: FchatWeb.Endpoint."call (overridable 3)"/2
    (fchat) lib/fchat_web/endpoint.ex:1: FchatWeb.Endpoint.call/2
    (plug) lib/plug/adapters/cowboy/handler.ex:16: Plug.Adapters.Cowboy.Handler.upgrade/4
    (cowboy) /Users/namikishun/.ghq/github-private/snamiki1212/fchat/deps/cowboy/src/cowboy_protocol.erl:442: :cowboy_protocol.execute/4
```

- `respawn/0`
end pry
```elixir
pry(8)> xyz=1
1
pry(9)> xyz
1
pry(10)> respawn

Interactive Elixir (1.7.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> xyz
** (CompileError) iex:1: undefined function xyz/0

```

- `continue/0`
continue pry

- 

```elixir
# start pry

Request to pry #PID<0.592.0> at FchatWeb.PageController.index/2 (lib/fchat_web/controllers/page_controller.ex:6)

    4:   def index(conn, _params) do
    5:     a=1
    6:     require IEx;IEx.pry
    7:     b=2
    8:     require IEx;IEx.pry
    9:     c=3

Allow? [Yn] y

Interactive Elixir (1.7.3) - press Ctrl+C to exit (type h() ENTER for help)
pry(1)> a
1
pry(2)> b
** (UndefinedFunctionError) function :erl_eval.b/0 is undefined or private
pry(2)> continue
pry(1)> b
2
pry(2)> c
** (UndefinedFunctionError) function :erl_eval.c/0 is undefined or private
pry(2)>
```

# etc
## `binding/0`


> `binding/0` or `binding/1` returns the binding for the given context as a keyword list.

```elixir
iex> binding() |> IO.inspect()
iex> binding() |> inspect() |> Logger.info()
```

### Reference
- [Elixir — quick reference for debugging techniques](https://medium.com/@leandrocesquini/elixir-quick-reference-for-debugging-techniques-8dad3920ab93)
- [Elixir - binding(context \\ nil)](https://hexdocs.pm/elixir/Kernel.html#binding/1)
- [ElixirConf 2018 - You Can Never Debug the Code You Run But You Can... - Luke Imhoff](https://www.youtube.com/playlist?list=PLqj39LCvnOWaxI87jVkxSdtjG8tlhl7U6)
