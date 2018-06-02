## `binding/0`
### Content

`binding/0` or `binding/1` returns the binding for the given context as a keyword list.

### How to

```elixir
iex> binding() |> IO.inspect()
iex> binding() |> inspect() |> Logger.info()
```

### Reference
- [Elixir — quick reference for debugging techniques](https://medium.com/@leandrocesquini/elixir-quick-reference-for-debugging-techniques-8dad3920ab93)
- [Elixir - binding(context \\ nil)](https://hexdocs.pm/elixir/Kernel.html#binding/1)
