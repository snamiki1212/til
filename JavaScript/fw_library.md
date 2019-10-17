# js のFW/library

## Formik

- render props で formを作成する

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
        onPress={props.handleSubmit} // １つうえのレイヤーのFormik>props>onSubmitが呼ばれる
        disabled={!props.isValid}
      />
    </>
  )}
/>
```

- REF: https://jaredpalmer.com/formik/docs/api/formik#onsubmit-values-values-formikbag-formikbag-void