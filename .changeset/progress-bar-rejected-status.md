---
"@wizleap-inc/wiz-ui-styles": minor
"@wizleap-inc/wiz-ui-next": major
"@wizleap-inc/wiz-ui-react": major
---

feat(progress-bar)!: rejected ステータスの追加と progress の型変更

- `ProgressStatus` に `"rejected"`（赤の破線ボーダー・ピンク背景）を追加
- `ProgressItem.progress` を `boolean` から `"active" | "inactive" | "rejected"` に変更（新しく `ProgressState` 型としてエクスポート）
- `WizProgressLine` の props を `active: boolean` から `state: ProgressState` に変更

BREAKING CHANGE: `progress: true` は `progress: "active"`、`progress: false` は `progress: "inactive"` に置き換えてください。`WizProgressLine` を直接使用している場合は `active` prop を `state` にリネームしてください。
