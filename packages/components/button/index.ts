import { VueConstructor } from "vue";
import Button from "./src/Button.vue";

Button.install = (Vue: VueConstructor) => {
  Vue.component(Button.name, Button);
};

export { Button };
