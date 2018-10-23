# tips

## PRY
  1. write pry code on test code

  ```elixir
  require IEx;IEx.pry
  ```

  2. execute test with `iex -S mix`

  ```shell
  MIX_ENV=test iex -S mix test
  ```

## setup 2 args

  ```elixir
  setup do
    :xxx_yyy_zzz
  end

  test "first", context do
    assert :xxx_yyy_zzz == context
  end
  ```
  
## recommend test name

  ```elixir
  # HTTP_METHOD url
  "DELETE /users/channels/blocks/:id"
  ```

