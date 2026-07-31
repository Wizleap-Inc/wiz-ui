---
"@wizleap-inc/wiz-ui-styles": minor
"@wizleap-inc/wiz-ui-next": minor
"@wizleap-inc/wiz-ui-react": minor
---

feat(checkbox,radio): disabled 状態のデザインを統一 (checked 時は green.500 に薄めた表示、opacity による半透明表現を廃止)

- WizCheckBoxNew: disabled+checked の塗りを gray.400 → green.500 に変更、bordered 版の枠線を green.500 に変更
- WizRadioNew: disabled+checked を「白背景 + green.500 枠 + green.500 ドット」に変更
- WizCheckBox (legacy) / WizRadio (legacy): opacity 0.5 を廃止し、checked 時は green.500、unchecked 時は薄グレーの状態別スタイルに変更
- WizCheckBoxNew (Vue): チェックアイコンを checked 時のみ描画するよう修正 (React 版と同挙動に)
