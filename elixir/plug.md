
# Memo to read [elixir-plug README](https://github.com/elixir-plug/plug)

## How to wakeup

  1. function
  2. supervisor tree

## Plug types
  - function plug
  - module plug
    - `init` : initialize the options
    - `call` : execute plug logic

## `Plug.Conn` Structure ( `%Plug.Conn{}` )

  - (called __connection__ on documents)
  - immutable
  - manipulating with Plug.Conn function
  - direct interface to the web server.
    - call `send_resp/3` and immediately send the given and body to client.

## Plug.Router

  - this is Plug, too.

## etc
  - Plug ships with many plugs.

