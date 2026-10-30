---
"@wizleap-inc/wiz-ui-react": patch
---

useClickOutside を「pointerdown で外側判定・click で閉じる・開いている間だけ 1 tick 遅れて監視する」形に変更。iPad で Popup（Dropdown 等）が「項目を押すと下の要素に click が落ちる」「開いた瞬間に閉じて開けない」問題の修正
