import Vue from "vue";

import * as components from "./components";
export * from "./components";
export * from "@wizleap-inc/wiz-ui-constants";
import "@wizleap-inc/wiz-ui-styles/global.css";

export const install = (vue: typeof Vue) => {
  Object.values(components).forEach((component) => {
    if (component.name) vue.component(component.name, component);
  });
};

export const version = "0.4.1";

export default {
  install,
  version,
};
