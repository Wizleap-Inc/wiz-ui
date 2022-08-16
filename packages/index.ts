import * as components from "./components";
import _Vue from "vue";

type ComponentKey = keyof typeof components;
const isLiteral = (component: string): component is ComponentKey =>
  Object.keys(components).includes(component);

const install = (Vue: typeof _Vue) => {
  for (const component in components) {
    if (!isLiteral(component)) return;

    Vue.component(component, components[component]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;

export * from "./components";
