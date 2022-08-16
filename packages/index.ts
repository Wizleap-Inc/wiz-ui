import * as components  from "./components";
import _Vue from "vue";

const install = (Vue: typeof _Vue) => {
  for (const component in components) {
    // @ts-ignore
    Vue.component(component, components[component]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;

export * from "./components";
