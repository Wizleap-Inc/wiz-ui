# 開発環境の立ち上げ

```bash
git clone https://github.com/Wizleap-Inc/wiz-ui.git
cd wiz-ui
```

## 基本

```bash
yarn # install dependencies
yarn dev # start all dev server
```

## 特定ワークスペースのみ立ち上げ

```bash
yarn dev:docs # start docs dev server
yarn dev:wiz-ui # start wiz-ui dev server(Storybook)
yarn dev:examples # start examples dev server
```

## ビルド

```bash
yarn build # build all packages
```

## 特定ワークスペースのみビルド

```bash
yarn build:docs # build docs
yarn build:wiz-ui # build wiz-ui
yarn build:examples # build examples
```
