# MessageBox

## Import

```ts
import { WizMessageBox } from "@wizleap-inc/wiz-ui";
```

## Usage

```vue
<WizMessageBox title="タイトル">
  メッセージ
</WizMessageBox>
```

<WizMessageBox title="タイトル">メッセージ</WizMessageBox>

## Props

### Title

**Required**

```vue
<WizMessageBox title="タイトル">
  メッセージ
</WizMessageBox>
```

<WizMessageBox title="タイトル">メッセージ</WizMessageBox>

### Variant

**Default**: `information`

**Options**: `information`, `caution`, `warning`

```vue
<WizMessageBox title="タイトル" variant="information">
  メッセージメッセージメッセージメッセージメッセージ
</WizMessageBox>
<WizMessageBox title="タイトル" variant="caution">
  メッセージメッセージメッセージメッセージメッセージ
</WizMessageBox>
<WizMessageBox title="タイトル" variant="warning">
  メッセージメッセージメッセージメッセージメッセージ
</WizMessageBox>
```

<WizMessageBox title="タイトル" variant="information">メッセージメッセージメッセージメッセージメッセージ</WizMessageBox>
<WizMessageBox title="タイトル" variant="caution">メッセージメッセージメッセージメッセージメッセージ</WizMessageBox>
<WizMessageBox title="タイトル" variant="warning">メッセージメッセージメッセージメッセージメッセージ</WizMessageBox>

### Expand

**Default**: `false`

**Options**: `true`, `false`

```vue
<WizMessageBox title="タイトル" expand>
  メッセージメッセージメッセージメッセージメッセージ
</WizMessageBox>
```

<WizMessageBox title="タイトル" expand>メッセージメッセージメッセージメッセージメッセージ</WizMessageBox>
