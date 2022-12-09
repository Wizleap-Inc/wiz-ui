# リポジトリの構造

## 環境

- Vue@^2.7
- Vue Router@^3
- Portal Vue@^2

## ワークスペース

```text
root
├── docs (VuePress Documentation)
├── examples
│   └── vue2 (example application using Wiz UI)
└── packages
    ├── wiz-ui
    └── wiz-ui@next (comming soon)
```

## wiz-ui

```text
wiz-ui
├── src (ソースコード)
│   ├── components (Vueコンポーネント）
│   │   ├── bases (button, icon, etc...)
│   │   └── customs (card, notifications, etc...)
│   ├── constants (サイズ定数、色定数、etc...)
│   │   └── [...]
│   ├── hooks (Vue Hooks, Composition API)
│   │   └── [...]
│   ├── providers (VueのProviderパターンを実装したもの)
│   │   └── [...]
│   ├── types (型定義ファイル、型エイリアス)
│   │   └── [...]
│   ├── utils (ユーティリティ関数、副作用のない関数群)
│   │   └── [...]
│   └── index.ts (エントリーポイント)
└── .storybook (Storybookの設定ファイル)
    └── [...]
```
