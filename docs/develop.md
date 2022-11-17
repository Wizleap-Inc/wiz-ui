# 開発方法

## Storybook

Vueでstorybookを書くにあたっては、VueのString Templateを使用することが多いです。
JSXだと書きやすいのですが、まだVue2ではJSXがネィティブにサポートされていないため、どうしてもCSFで書くにはString Templateの知識が必要になります。

### String Template

我々がよく使うSFC(Single File Component)のフォーマットでは1つのファイルに1つのコンポーネントしか書けないため、Storybookのような複数のVariantを持つコンポーネントを書くのに不便です。
そこで、String Templateを使用することで、1つのファイルに複数のコンポーネントを書くことができます。

```vue
<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script setup lang="ts">
const msg = 'Hello World'
</script>

<style scoped lang="scss">
p {
  color: red;
}
</style>
```

は

```ts
const HelloWorld = Vue.component({
  template: `
    <div>
      <p>{{ msg }}</p>
    </div>
  `,
  setup() {
    const msg = 'Hello World'
    return { msg }
  },
  style: `
    p {
      color: red;
    }
  `,
})
```
