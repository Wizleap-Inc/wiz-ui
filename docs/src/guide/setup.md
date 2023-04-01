# 開発環境の立ち上げ

```bash
git clone https://github.com/Wizleap-Inc/wiz-ui.git
cd wiz-ui
```

## 基本

```bash
pnpm install # install all dependencies
pnpm dev # start all dev server
```

## 特定ワークスペースのみ立ち上げ

```bash
pnpm dev --filter @wizleap-inc/wiz-ui-docs # start docs dev server
pnpm dev --filter @wizleap-inc/wiz-ui # start wiz-ui dev server(Storybook)
pnpm dev --filter @wizleap-inc/wiz-ui-next # start wiz-ui-next dev server(Storybook)
pnpm dev --filter "@wizleap-inc/wiz-ui-example*" # start examples dev server
```

## ビルド

```bash
pnpm build # build all packages
```

## 特定ワークスペースのみビルド

```bash
pnpm build --filter @wizleap-inc/wiz-ui-docs # build docs
pnpm build --filter @wizleap-inc/wiz-ui # build wiz-ui
pnpm build --filter @wizleap-inc/wiz-ui-next # build wiz-ui-next
pnpm build --filter "@wizleap-inc/wiz-ui-example*" # build examples
```
