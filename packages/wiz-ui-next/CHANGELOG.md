# @wizleap-inc/wiz-ui-next

## 1.7.0

### Minor Changes

- [#699](https://github.com/Wizleap-Inc/wiz-ui/pull/699) [`2a271180`](https://github.com/Wizleap-Inc/wiz-ui/commit/2a27118005a851fb13b23647ceeb9e68deb7dbb3) Thanks [@RyushiAok](https://github.com/RyushiAok)! - Fixed された Popup がスクロールされるバグを修正

- [#727](https://github.com/Wizleap-Inc/wiz-ui/pull/727) [`bfb05654`](https://github.com/Wizleap-Inc/wiz-ui/commit/bfb05654c74ea6a270a6aad06059fd3249fc0a24) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WizFlatTh, WizFlatTd のフォントサイズを xs2~md の間で指定できるようにする。

### Patch Changes

- [#738](https://github.com/Wizleap-Inc/wiz-ui/pull/738) [`3a8bda00`](https://github.com/Wizleap-Inc/wiz-ui/commit/3a8bda005247acaac2230ea85936f1bc46f44ac8) Thanks [@ichi-h](https://github.com/ichi-h)! - - useSnackbar の形で snackbar を利用できるようにする
  - wiz-ui の global provider にアクセスするための globalKey が公開されていないため、inject の形で snackbar を利用できない
  - 今後 react にも snackbar が実装された場合、inject から snackbar を取得した場合、vue と react で snackbar のインターフェースが異なることになるため
- Updated dependencies [[`2a271180`](https://github.com/Wizleap-Inc/wiz-ui/commit/2a27118005a851fb13b23647ceeb9e68deb7dbb3)]:
  - @wizleap-inc/wiz-ui-styles@0.6.0

## 1.6.0

### Minor Changes

- [#673](https://github.com/Wizleap-Inc/wiz-ui/pull/673) [`3955c01e`](https://github.com/Wizleap-Inc/wiz-ui/commit/3955c01ec78d1ab9a727e0e9a7241f958efbfc53) Thanks [@RyushiAok](https://github.com/RyushiAok)! - CompareGraph に横軸ラベルの回転機能を追加

- [#608](https://github.com/Wizleap-Inc/wiz-ui/pull/608) [`7dd4331d`](https://github.com/Wizleap-Inc/wiz-ui/commit/7dd4331db545b2dda050b145f5b5def2aeb87f87) Thanks [@RyushiAok](https://github.com/RyushiAok)! - ・内部で仮想 DOM を用いた手動レンダリングが入ることによるライフサイクルのバグの修正
  ・スナックバー表示関数「snack」を global provider から取得する

### Patch Changes

- [`9c729560`](https://github.com/Wizleap-Inc/wiz-ui/commit/9c7295600a5171938c0bdfc71e5bd60243e365a1) Thanks [@okakyo](https://github.com/okakyo)! - fix meter position

- Updated dependencies [[`2d737b6e`](https://github.com/Wizleap-Inc/wiz-ui/commit/2d737b6eaf06f6187a805468b31ae908ea1e0e0d)]:
  - @wizleap-inc/wiz-ui-styles@0.5.0

## 1.5.0

### Minor Changes

- [#694](https://github.com/Wizleap-Inc/wiz-ui/pull/694) [`b16a00b9`](https://github.com/Wizleap-Inc/wiz-ui/commit/b16a00b9594e2798c2e173ff91cdb2ff7f6b31e0) Thanks [@RyushiAok](https://github.com/RyushiAok)! - ArrowDropUp, ArrowDropDown アイコンを追加。WizDatePicker に年を選択する機能を追加。

- [#693](https://github.com/Wizleap-Inc/wiz-ui/pull/693) [`62d0c58a`](https://github.com/Wizleap-Inc/wiz-ui/commit/62d0c58a0eb8e4980d78bdcaeead6088dbc05712) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WizPopup の回り込みロジックを有効・無効にするオプションを追加

### Patch Changes

- [#705](https://github.com/Wizleap-Inc/wiz-ui/pull/705) [`31d9d7a6`](https://github.com/Wizleap-Inc/wiz-ui/commit/31d9d7a63417bfc7d4a0fac137cd0799128a4bb6) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WIzShowMoreLess コンポーネントが export されていない問題を修正

- Updated dependencies [[`b16a00b9`](https://github.com/Wizleap-Inc/wiz-ui/commit/b16a00b9594e2798c2e173ff91cdb2ff7f6b31e0)]:
  - @wizleap-inc/wiz-ui-constants@0.4.0
  - @wizleap-inc/wiz-ui-styles@0.4.0

## 1.4.0

### Minor Changes

- [#668](https://github.com/Wizleap-Inc/wiz-ui/pull/668) [`68b7493c`](https://github.com/Wizleap-Inc/wiz-ui/commit/68b7493cc4e0c0de9e8a23845526baa02cdc49e5) Thanks [@sor4chi](https://github.com/sor4chi)! - Schedule コンポーネントの追加

### Patch Changes

- Updated dependencies [[`68b7493c`](https://github.com/Wizleap-Inc/wiz-ui/commit/68b7493cc4e0c0de9e8a23845526baa02cdc49e5)]:
  - @wizleap-inc/wiz-ui-constants@0.3.0
  - @wizleap-inc/wiz-ui-styles@0.3.0
  - @wizleap-inc/wiz-ui-utils@0.2.0

## 1.3.0

### Minor Changes

- [`f946335f`](https://github.com/Wizleap-Inc/wiz-ui/commit/f946335f7a9d68a090d2ce01547c4b21394067e6) Thanks [@ichi-h](https://github.com/ichi-h)! - unstyled-table の Row に横罫線を引けるように

- [#692](https://github.com/Wizleap-Inc/wiz-ui/pull/692) [`aad6269f`](https://github.com/Wizleap-Inc/wiz-ui/commit/aad6269fe8d9ecd5195e94e72ee7870f120dbbbd) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WizTag の variant を変更（error -> red, success -> green）、新規タグ（黄色・青色）追加

- [`f946335f`](https://github.com/Wizleap-Inc/wiz-ui/commit/f946335f7a9d68a090d2ce01547c4b21394067e6) Thanks [@ichi-h](https://github.com/ichi-h)! - 各テーブルの colspan, rowspan (セル結合) に対応

### Patch Changes

- Updated dependencies [[`f946335f`](https://github.com/Wizleap-Inc/wiz-ui/commit/f946335f7a9d68a090d2ce01547c4b21394067e6), [`aad6269f`](https://github.com/Wizleap-Inc/wiz-ui/commit/aad6269fe8d9ecd5195e94e72ee7870f120dbbbd)]:
  - @wizleap-inc/wiz-ui-styles@0.2.0

## 1.2.1

### Patch Changes

- Updated dependencies [[`2868f46f`](https://github.com/Wizleap-Inc/wiz-ui/commit/2868f46f560697c1ad3049137ec943fe35649577)]:
  - @wizleap-inc/wiz-ui-constants@0.2.1
  - @wizleap-inc/wiz-ui-styles@0.1.2
  - @wizleap-inc/wiz-ui-utils@0.1.2

## 1.2.0

### Minor Changes

- [#638](https://github.com/Wizleap-Inc/wiz-ui/pull/638) [`beccd95d`](https://github.com/Wizleap-Inc/wiz-ui/commit/beccd95d1ded2cb02051e3915581559052220d4c) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WizIWarning（警告アイコン）を追加

- [#657](https://github.com/Wizleap-Inc/wiz-ui/pull/657) [`e26a1592`](https://github.com/Wizleap-Inc/wiz-ui/commit/e26a1592e322ce8396cbe3f796aae43cd9ebb99c) Thanks [@RyushiAok](https://github.com/RyushiAok)! - History アイコンを追加

### Patch Changes

- [#622](https://github.com/Wizleap-Inc/wiz-ui/pull/622) [`b1e79119`](https://github.com/Wizleap-Inc/wiz-ui/commit/b1e7911919a7ab9313c21f7c23269a7c81d13c30) Thanks [@RyushiAok](https://github.com/RyushiAok)! - tiny-button の padding が適用されない問題を修正

- Updated dependencies [[`d294e894`](https://github.com/Wizleap-Inc/wiz-ui/commit/d294e89421fd51c366e771f86b74a56a77c9a314), [`e26a1592`](https://github.com/Wizleap-Inc/wiz-ui/commit/e26a1592e322ce8396cbe3f796aae43cd9ebb99c), [`b1e79119`](https://github.com/Wizleap-Inc/wiz-ui/commit/b1e7911919a7ab9313c21f7c23269a7c81d13c30)]:
  - @wizleap-inc/wiz-ui-constants@0.2.0
  - @wizleap-inc/wiz-ui-styles@0.1.1
  - @wizleap-inc/wiz-ui-utils@0.1.1

## 1.1.0

### Minor Changes

- [#571](https://github.com/Wizleap-Inc/wiz-ui/pull/571) [`937a3e66`](https://github.com/Wizleap-Inc/wiz-ui/commit/937a3e66c049433c7c89746b6cf856bb5acd9786) Thanks [@RyushiAok](https://github.com/RyushiAok)! - WizCompareGraph を追加

### Patch Changes

- [#569](https://github.com/Wizleap-Inc/wiz-ui/pull/569) [`7dcb7118`](https://github.com/Wizleap-Inc/wiz-ui/commit/7dcb7118bf1729b20d7cac7c13ee5b75d208e090) Thanks [@sor4chi](https://github.com/sor4chi)! - gray 色に 200 の追加

## 1.0.5

### Patch Changes

- [#534](https://github.com/Wizleap-Inc/wiz-ui/pull/534) [`d1a739a`](https://github.com/Wizleap-Inc/wiz-ui/commit/d1a739a229964129ecf913cc883d7c5f3922cc60) Thanks [@sor4chi](https://github.com/sor4chi)! - - 開発環境
  - ICON の自動生成による共通化
  - パッケージマネージャーの PNPM 化
  - Component
    - search-selector の UX 改善
    - popup-button-group の disable 追加

## 1.0.4

### Patch Changes

- [#527](https://github.com/Wizleap-Inc/wiz-ui/pull/527) [`28ed055`](https://github.com/Wizleap-Inc/wiz-ui/commit/28ed0555c5772ec2cfb2ff28f36e5c86a82e51a3) Thanks [@sor4chi](https://github.com/sor4chi)! - Search Selector の Storybook の修正
