---
"@wizleap-inc/wiz-ui-react": patch
---

useClickOutside のタッチ判定を touchstart から click に変更。iOS で Popup の項目をタップすると、合成 click の前に Popup が閉じて下の要素に click が落ちる問題の修正
