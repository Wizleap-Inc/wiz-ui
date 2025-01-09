# @wizleap-inc/wiz-ui-example-react

## 1.1.0

### Minor Changes

- [#1410](https://github.com/Wizleap-Inc/wiz-ui/pull/1410) [`751115b5b08bbc3178eca2b71f4b1bd61a57de43`](https://github.com/Wizleap-Inc/wiz-ui/commit/751115b5b08bbc3178eca2b71f4b1bd61a57de43) Thanks [@k-tada](https://github.com/k-tada)! - スクロールバーデザインを修正

### Patch Changes

- Updated dependencies [[`79eb57fdd83084ef8794cac4943b8dc82f40aa11`](https://github.com/Wizleap-Inc/wiz-ui/commit/79eb57fdd83084ef8794cac4943b8dc82f40aa11), [`689100e2df32a9c66a2f8f193668cbea60270772`](https://github.com/Wizleap-Inc/wiz-ui/commit/689100e2df32a9c66a2f8f193668cbea60270772)]:
  - @wizleap-inc/wiz-ui-react@1.3.0
  - @wizleap-inc/wiz-ui-constants@0.34.0

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
