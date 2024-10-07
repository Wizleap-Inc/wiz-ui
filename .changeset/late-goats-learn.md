---
"@wizleap-inc/wiz-ui-react": major
"@wizleap-inc/wiz-ui-example-react": major
---

feat(input): value の generics 対応

- (BREAKING) WizSelectBox, WizSearchInput, WizSearchSelector の value に generics 対応
  - 基本的には props で渡した options や value の型から T が推論される
  - ただし、`typeof WizSelectBox`, `typeof WizSearchInput`, `typeof WizSearchSelector` のように指定している場合、T が unknown の型が得られるため、`typeof WizSelectBox<number>`, `typeof WizSearchInput<number>`, `typeof WizSearchSelector<number>` と指定する必要がある
