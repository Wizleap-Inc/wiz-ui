# @wizleap-inc/wiz-ui-utils

## 0.5.0

### Minor Changes

- [#1703](https://github.com/Wizleap-Inc/wiz-ui/pull/1703) [`35ce35b`](https://github.com/Wizleap-Inc/wiz-ui/commit/35ce35b6aa43055d3e1c3c4ec77afede3805eaa5) Thanks [@tsukasa-mi](https://github.com/tsukasa-mi)! - TimePicker に `allowInput` を追加し、入力欄に時刻を直接入力できるようにする（`H:mm`・`H時m分`・区切りなし、全角数字可）。解釈できない値・存在しない時刻・`minuteInterval` の刻みに合わない時刻は元の値に戻す。初期値は `false` で既存の挙動は変わらない

## 0.4.0

### Minor Changes

- [#1689](https://github.com/Wizleap-Inc/wiz-ui/pull/1689) [`020b9eb`](https://github.com/Wizleap-Inc/wiz-ui/commit/020b9eb8a053cb8056a4d71403d4af7d3e314bbe) Thanks [@tsukasa-mi](https://github.com/tsukasa-mi)! - DatePicker に `allowInput` を追加し、入力欄に日付を直接入力できるようにする（`YYYY/MM/DD`・`YYYY-MM-DD`・`YYYY年M月D日`・区切りなし8桁、全角数字可、後ろに時刻などが続いても日付部分を採用）。解釈できない値・無効な日付は元の値に戻す。初期値は `false` で既存の挙動は変わらない

## 0.3.0

### Minor Changes

- [#798](https://github.com/Wizleap-Inc/wiz-ui/pull/798) [`3926b854`](https://github.com/Wizleap-Inc/wiz-ui/commit/3926b8548619958e0defacc71c1db343845f84da) Thanks [@RyushiAok](https://github.com/RyushiAok)! - 同じ日付を選択可能にする
  リセット機能を追加

## 0.2.0

### Minor Changes

- [#668](https://github.com/Wizleap-Inc/wiz-ui/pull/668) [`68b7493c`](https://github.com/Wizleap-Inc/wiz-ui/commit/68b7493cc4e0c0de9e8a23845526baa02cdc49e5) Thanks [@sor4chi](https://github.com/sor4chi)! - Schedule コンポーネントの追加

## 0.1.2

### Patch Changes

- [#665](https://github.com/Wizleap-Inc/wiz-ui/pull/665) [`2868f46f`](https://github.com/Wizleap-Inc/wiz-ui/commit/2868f46f560697c1ad3049137ec943fe35649577) Thanks [@sor4chi](https://github.com/sor4chi)! - postinstall の命名を改修、使う側で npm install した時に発火しないようにした

## 0.1.1

### Patch Changes

- [#662](https://github.com/Wizleap-Inc/wiz-ui/pull/662) [`d294e894`](https://github.com/Wizleap-Inc/wiz-ui/commit/d294e89421fd51c366e771f86b74a56a77c9a314) Thanks [@sor4chi](https://github.com/sor4chi)! - ts をビルドしたコードを提供するように修正

## 0.1.0

### Minor Changes

- [#649](https://github.com/Wizleap-Inc/wiz-ui/pull/649) [`c54a3a61`](https://github.com/Wizleap-Inc/wiz-ui/commit/c54a3a61caeb68735601af16ed21f0ff2568e810) Thanks [@sor4chi](https://github.com/sor4chi)! - Add Wiz UI styles and utils to wiz-ui registry
