---
"@wizleap-inc/wiz-ui-constants": minor
"@wizleap-inc/wiz-ui-next": minor
"@wizleap-inc/wiz-ui-react": minor
"@wizleap-inc/wiz-ui-styles": minor
---

DateRangePicker に `allowInput` を追加し、開始日・終了日の入力欄に日付を直接入力できるようにする（受け付ける形式は DatePicker と同じ）。解釈できない値・無効な日付・開始日と終了日が前後する日付は元の値に戻す。初期値は `false` で既存の挙動は変わらない
