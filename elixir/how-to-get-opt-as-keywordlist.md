
```elixir
defmodule Bar do
  # for size
  def foo(params, [{:size, size}| rest]) do
    IO.inspect("size is #{size}")
    foo(params, rest)
  end

  # for name
  def foo(params, [{:name, name}| rest]) do
    IO.inspect("name is #{name}")
    foo(params, rest)
  end

  # ignore not to except options
  def foo(params, [_| rest]) do
    foo(params, rest)
  end
  
  # after getting all option
  def foo(params, []) do
    IO.inspect("params is #{params}")
  end
end

## call
params = 1
opts = [name: "foobar", size: 2, dust: 123]
Bar.foo(params, opts)

```


## Reference

  - [The Little Elixir & OTP Guidebook(P125)](https://www.manning.com/books/the-little-elixir-and-otp-guidebook)

