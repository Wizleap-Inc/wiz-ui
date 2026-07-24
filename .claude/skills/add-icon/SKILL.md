---
name: add-icon
description: wiz-ui にアイコンを追加する。Material Symbols (fonts.google.com/icons) から SVG を取得して packages/icons/assets に配置し、Issue 作成 → ビルド → Storybook 確認 → changeset → PR までの一連のフローを実行する。「アイコンを追加して」「〜のアイコンが欲しい」等の依頼で使用する。
argument-hint: <icon-name> [bold|filled|normal]...
---

# wiz-ui アイコン追加フロー

Material Symbols (Rounded) から SVG を取得し、wiz-ui のアイコンコンポーネントとして追加して PR を作成する。

## Step 1. 入力の確認

追加するアイコンについて以下の2点を必ず確定させる。

**引数の解釈**: 最初の引数がアイコン名、それ以降はすべて種類（複数指定可）。例: `/add-icon home bold filled` → home の bold と filled を追加。

1. **アイコン名**: Material Symbols 上の名前（例: `home`, `calendar_month`）。引数や依頼文から読み取れない場合は、**AskUserQuestion は使わずテキストで自由入力してもらう**（候補の選択肢を出しても当たる確率が低いため）。その際「アイコンは https://fonts.google.com/icons で探して、そのアイコン名を教えてほしい」と案内すること。
   - **完全一致の確認必須**: 指定された名前が Material Symbols 上に完全一致で存在するかを取得前に確認する（Step 4 の URL が 200 を返すかで判定できる）。完全一致で存在しない場合は、**似た名前で勝手に進めず必ずユーザーに聞き返す**（候補があれば提示してよい）
2. **種類**（複数選択可）: 引数や依頼文で明示されていない場合は **AskUserQuestion（multiSelect）で必ず選択させる。デフォルトで勝手に決めてはいけない**。選択肢は **Normal を最上部**にし、Normal / Bold / Filled の順で並べる:

| 種類   | 保存ファイル名            | 仕様                                                | 備考           |
| ------ | ------------------------- | --------------------------------------------------- | -------------- |
| Normal | `<kebab-name>.svg`        | Rounded / fill: 0 / weight: 200 / grade: 0 / 24     | **deprecated** |
| Bold   | `<kebab-name>-bold.svg`   | Rounded / fill: off / weight: 400 / grade: 0 / 24dp |                |
| Filled | `<kebab-name>-filled.svg` | Rounded / fill: on / weight: 400 / grade: 0 / 24dp  |                |

## Step 2. ブランチ作成

`main` を最新化してから `feat/icon-<name>` ブランチを作成する。

```sh
git switch main && git pull && git switch -c feat/icon-<name>
```

## Step 3. Issue 作成

`.github/ISSUE_TEMPLATE/機能追加（アイコン）.md` と同じ形式で Issue を作成する（実例: #1641）。

````sh
gh issue create --title "Feat(icon): <name>-<variant>" --body '追加するアイコン:

```yaml
- <name> (bold) # -> WizI<PascalName>Bold
- <name> (filled) # -> WizI<PascalName>Filled
```'
````

作成された Issue 番号は Step 9 の PR body で使うので控えておく。

## Step 4. SVG の取得

以下の URL から curl で取得する。**URL 中のアイコン名は snake_case**（例: `calendar_month`）、**保存ファイル名は kebab-case**（例: `calendar-month`）である点に注意。

```
https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/<snake_case_name>/<spec>/24px.svg
```

| 種類                | `<spec>`  |
| ------------------- | --------- |
| Bold                | `default` |
| Filled              | `fill1`   |
| Normal (deprecated) | `wght200` |

取得例（bold + filled）:

```sh
cd packages/icons/assets
curl -sf "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/<snake_name>/default/24px.svg" -o <kebab-name>-bold.svg
curl -sf "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/<snake_name>/fill1/24px.svg" -o <kebab-name>-filled.svg
```

- 404 になる場合はアイコン名が違う。https://fonts.google.com/icons で正式名を確認して再試行する
- 取得後、中身が `<svg` で始まる正常な SVG かを必ず確認する

## Step 5. SVG の加工（width/height を 1em に）

取得した SVG は `height="24" width="24"` になっているので、**両方を `1em` に置換する**（既存の全アイコンと同じ。`1rem` ではない — 1em でないと親の font-size に追従しなくなる）。

```sh
sed -i '' 's/height="24"/height="1em"/; s/width="24"/width="1em"/' <file>.svg
```

加工後の期待形（既存の `bookmark-bold.svg` などと同形式）:

```svg
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em"><path d="..."/></svg>
```

注意: `fill` 属性や `fill="currentColor"` は**追加しない**（色は利用側の CSS `fill` で制御する。過去に fill が混入して修正した経緯あり）。

## Step 6. ビルド

```sh
cd packages/icons && pnpm build
```

これにより以下が自動生成される。手で編集しないこと。

- `packages/constants/component/icon-name.ts`（`WizI<PascalName>` が追加される）
- `packages/wiz-ui-next/src/components/icons/<kebab-name>.vue` + `index.ts`
- `packages/wiz-ui-react/src/components/icons/<kebab-name>.tsx` + `index.ts`

ビルド後、`git status` で上記ファイルが生成・更新されていることを確認する。

## Step 7. Storybook で確認

```sh
pnpm --filter @wizleap-inc/wiz-ui-next storybook:dev   # port 6007
```

`Icons` > `Overview` ストーリー（http://localhost:6007/?path=/story/icons--overview）に新しいアイコンが名前つきで表示され、形が崩れていないことを確認する。ブラウザ自動化ツールが使えるならスクリーンショットで検証し、使えなければユーザーに目視確認を依頼する。確認が済んだら Storybook プロセスは停止する。

## Step 8. changeset 追加

`.changeset/` にランダムな名前の md ファイルを作成する（例: `.changeset/add-icon-<name>.md`）。過去の実例（`wide-shirts-tan.md`）と同形式:

```md
---
"@wizleap-inc/wiz-ui-react": minor
"@wizleap-inc/wiz-ui-next": minor
"@wizleap-inc/wiz-ui-constants": minor
"@wizleap-inc/wiz-ui-icons": minor
---

Icon の追加 (<PascalName>Bold, <PascalName>Filled)
```

## Step 9. commit & PR 作成

コミットメッセージは既存の規約に合わせる（例: `feat: <name> の icon を追加`）。

```sh
git add packages/icons/assets packages/constants packages/wiz-ui-next/src/components/icons packages/wiz-ui-react/src/components/icons .changeset
git commit -m "feat: <name> の icon を追加"
git push -u origin feat/icon-<name>
gh pr create --title "Feat(icon): <name>-<variant>" --body "close #<issue番号>

## 変更内容
- <name> (bold / filled) のアイコンを追加"
```

PR 作成後、URL をユーザーに報告する。
