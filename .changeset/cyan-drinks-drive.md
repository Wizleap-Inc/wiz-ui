---
"@wizleap-inc/wiz-ui-next": patch
"@wizleap-inc/wiz-ui": patch
---

- useSnackbar の形で snackbar を利用できるようにする
  - wiz-ui の global provider にアクセスするための globalKey が公開されていないため、inject の形で snackbar を利用できない
  - 今後 react にも snackbar が実装された場合、inject から snackbar を取得した場合、vue と react で snackbar のインターフェースが異なることになるため
