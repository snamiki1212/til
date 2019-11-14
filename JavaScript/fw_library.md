# js のFW/library

## Formik

- render props で formを作成する。render-propsの中にフォーム（インプット・ボタン）が入る。
- touchedがうまく動かないケースがあるので、handleBlurのタイミングで手動でtouchedをtrueにしないといけない。

```tsx
<Formik
  onSubmit={(values, formikBug) => {
    // 1引数： valuesにはformで扱うデータがオブジェクトで格納されている
    // 2引数: ???
    console.log('email is ', values.email)
    // ...処理
  }}

  render={props=>(
    // props の中では、formikが用意している様々な関数・値を使える
    // - props.<formik-property>.<form-value>でrender-propsの値を使う
    <>
      <Field
        placeholder="mail@example.com"
        onBlur={props.handleBlur}
        onChangeText={props.handleChange('email')}
        value={props.values.email}
        touched={props.touched.email}
        error={props.errors.email}
      />
      <Button
        title="再発行リンクを送信"
        onPress={props.handleSubmit} // １つうえのレイヤーの<Formik />のpropsのonSubmitが呼ばれる
        disabled={!props.isValid}
      />
    </>
  )}
/>
```

- REF: https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag-void