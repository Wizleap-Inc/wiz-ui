---
"@wizleap-inc/wiz-ui-constants": minor
"@wizleap-inc/wiz-ui-next": minor
"@wizleap-inc/wiz-ui-react": minor
"@wizleap-inc/wiz-ui-styles": minor
"@wizleap-inc/wiz-ui-utils": minor
---

TimePicker に `allowInput` を追加し、入力欄に時刻を直接入力できるようにする（`H:mm`・`H時m分`・区切りなし、全角数字可）。解釈できない値・存在しない時刻・`minuteInterval` の刻みに合わない時刻は元の値に戻す。初期値は `false` で既存の挙動は変わらない
