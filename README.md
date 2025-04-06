# Wiz UI

Original Vue@^2.7 and Vue@^3.0 components library for Wizleap

## Installation

```bash
npm install @wizleap-inc/wiz-ui
yarn add @wizleap-inc/wiz-ui
pnpm add @wizleap-inc/wiz-ui
```

## Usage

import stylesheet in your main.js

```js
import "@wizleap-inc/wiz-ui/dist/style.css";
```

import components in your component

```js
import { WizTextButton } from "@wizleap-inc/wiz-ui";
```

## Contributing

### Prepare

```bash
pnpm install
pnpm build
```

### Development

```bash
pnpm dev --filter @wizleap-inc/wiz-ui-docs # start docs dev server
pnpm dev --filter @wizleap-inc/wiz-ui # start wiz-ui dev server(Storybook)
pnpm dev --filter @wizleap-inc/wiz-ui-next # start wiz-ui-next dev server(Storybook)
pnpm dev --filter "@wizleap-inc/wiz-ui-example*" # start examples dev server
```

## License

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
Wiz UI is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

See [LICENSE](./LICENSE) for details!!

Commercial use of Wiz UI is prohibited without the prior written permission of Wizleap Inc. To request permission for commercial use, please contact Wizleap Inc. at https://wizleap.co.jp/contact/.
