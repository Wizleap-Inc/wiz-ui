# @wizleap-inc/wiz-ui-example-react

## 1.0.0

### Major Changes

- [#1366](https://github.com/Wizleap-Inc/wiz-ui/pull/1366) [`022fd19b634b91733ad32d6eeeb1725dcdbe8fd2`](https://github.com/Wizleap-Inc/wiz-ui/commit/022fd19b634b91733ad32d6eeeb1725dcdbe8fd2) Thanks [@RyushiAok](https://github.com/RyushiAok)! - feat(input): value の generics 対応

  - (BREAKING) WizSelectBox, WizSearchInput, WizSearchSelector の value に generics 対応
    - 基本的には props で渡した options や value の型から T が推論される
    - ただし、`typeof WizSelectBox`, `typeof WizSearchInput`, `typeof WizSearchSelector` のように指定している場合、T が unknown の型が得られるため、`typeof WizSelectBox<number>`, `typeof WizSearchInput<number>`, `typeof WizSearchSelector<number>` と指定する必要がある

### Patch Changes

- Updated dependencies [[`d0e8556a47433c4e40226fe171b638e593103061`](https://github.com/Wizleap-Inc/wiz-ui/commit/d0e8556a47433c4e40226fe171b638e593103061), [`022fd19b634b91733ad32d6eeeb1725dcdbe8fd2`](https://github.com/Wizleap-Inc/wiz-ui/commit/022fd19b634b91733ad32d6eeeb1725dcdbe8fd2)]:
  - @wizleap-inc/wiz-ui-react@1.0.0
  - @wizleap-inc/wiz-ui-constants@0.32.0
