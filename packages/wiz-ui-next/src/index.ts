import * as components from "./components";

import type { App, Plugin } from "vue";

export * from "./components";
export * from "@wizleap-inc/wiz-ui-constants";
import "@wizleap-inc/wiz-ui-styles/global.css";

export const install = (app: App) => {
  Object.values(components).forEach((component) => {
    app.use(component as unknown as Plugin);
  });
};

export const version = "0.7.0";

export default {
  install,
  version,
};
