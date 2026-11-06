---
"@wizleap-inc/wiz-ui-next": minor
"@wizleap-inc/wiz-ui-react": minor
"@wizleap-inc/wiz-ui-styles": minor
"@wizleap-inc/wiz-ui-utils": minor
---

DatePicker に `allowInput` を追加し、入力欄に日付を直接入力できるようにする（`YYYY/MM/DD`・`YYYY-MM-DD`・`YYYY年M月D日`・区切りなし8桁、全角数字可、後ろに時刻などが続いても日付部分を採用）。解釈できない値・無効な日付は元の値に戻す。初期値は `false` で既存の挙動は変わらない
