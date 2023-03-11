# Migration guide for WizUI(for Vue2) to WizUINext(for Vue3)

## Multiple V-Model

Vue2では、`v-model`を複数の要素に付与することができませんでしたが、Vue3ではそれが可能になったため、一部簡潔な実装を目的としたコンポーネントの実装方法がVue2/3で異なるものがあります。

### 書き換えの必要があるコンポーネント

- `WizChatCard`
  - Vue2では`:status`と`@updateStatus`を使用していましたが、Vue3では`v-model:status`を使用するようになりました。
- `WizRangeDatePicker`
  - Vue2では`:selectBoxValue`と`@updateSelectBoxValue`を使用していましたが、Vue3では`v-model:selectBoxValue`を使用するようになりました。
