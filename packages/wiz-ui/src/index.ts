import Vue from "vue";

import * as components from "./components";
export * from "./components";
export * from "./constants";

export const install = (vue: typeof Vue) => {
  Object.values(components).forEach((component) => {
    console.log(component);
    vue.component(component.name, component);
  });
};

export const version = "0.2.1";

export default {
  install,
  version,
};
