import { VueConstructor } from "vue";
import Button from "./src/Button.vue";

// @ts-ignore
Button.install = (Vue: VueConstructor) => {
  Vue.component(Button.name, Button);
};

export { Button };
