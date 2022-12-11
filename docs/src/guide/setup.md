# 開発環境の立ち上げ

```bash
git clone https://github.com/Wizleap-Inc/wiz-ui.git
cd wiz-ui
```

## 基本

```bash
npm ci # install dependencies
npm run dev # start all dev server
```

## 特定ワークスペースのみ立ち上げ

```bash
npm run dev:docs # start docs dev server
npm run dev:wiz-ui # start wiz-ui dev server(Storybook)
npm run dev:examples # start examples dev server
```

## ビルド

```bash
npm run build # build all packages
```

## 特定ワークスペースのみビルド

```bash
npm run build:docs # build docs
npm run build:wiz-ui # build wiz-ui
npm run build:examples # build examples
```
