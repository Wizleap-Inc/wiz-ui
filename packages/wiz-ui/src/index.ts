import Vue from "vue";

import * as components from "./components";
export * from "./components";
export * from "@wiz-ui/constants";

export const install = (vue: typeof Vue) => {
  Object.values(components).forEach((component) => {
    if (component.name) vue.component(component.name, component);
  });
};

export const version = "0.2.3";

export default {
  install,
  version,
};
