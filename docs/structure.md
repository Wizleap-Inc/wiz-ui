# リポジトリの構造

## 環境

- Vue@^2.7
- Vue Router@^3
- Storybook@^7(alpha)

## root

```text
root
├── docs
│   └── [Some Documents]
└── packages (npm workspace)
    ├── wiz-ui
    │   └── [...]
    └── wiz-ui@next (comming soon)
```

## wiz-ui

```text
wiz-ui
├── dist (build files, pushed to npm, gitignored)
│   └── [...]
├── src (source files)
│   ├── components (Vue components)
│   │   ├── atoms (button, icon, etc...)
│   │   └── molecules (card, form, etc...)
│   ├── constants (constants; style variables, etc...)
│   │   └── [...]
│   ├── types (type definitions, conclude with .d.ts)
│   │   └── [...]
│   ├── utils (utility functions, which has no side effects)
│   │   └── [...]
│   └── index.ts (entry point)
└── .storybook (storybook config)
    └── [...]
```
