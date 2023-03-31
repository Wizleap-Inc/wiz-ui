# Migration guide for WizUI(for Vue2) to WizUINext(for Vue3)

## Multiple V-Model

Vue2 では、`v-model`を複数の要素に付与することができませんでしたが、Vue3 ではそれが可能になったため、一部簡潔な実装を目的としたコンポーネントの実装方法が Vue2/3 で異なるものがあります。

### 書き換えの必要があるコンポーネント

- `WizChatCard`
  - Vue2 では`:status`と`@updateStatus`を使用していましたが、Vue3 では`v-model:status`を使用するようになりました。
- `WizDateRangePicker`
  - Vue2 では`:selectBoxValue`と`@updateSelectBoxValue`を使用していましたが、Vue3 では`v-model:selectBoxValue`を使用するようになりました。
