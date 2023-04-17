---
"@wizleap-inc/wiz-ui-react": patch
"@wizleap-inc/wiz-ui-next": patch
"@wizleap-inc/wiz-ui": patch
---

共通化してある wiz-ui の package が dependencies に入っていると、wiz-ui のリリースが utils と別タイミングで行われてしまうので、dependencies から外すようにしました。
