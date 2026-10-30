---
"@wizleap-inc/wiz-ui-react": patch
---

useClickOutside の内外判定を `event.composedPath()` で行うように変更。multiSelectable の SearchSelector で項目を選ぶたびに Popup が閉じる問題の修正
