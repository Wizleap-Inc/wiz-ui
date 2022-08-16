import { VueConstructor } from "vue";
import Paragraph from "./src/Paragraph.vue";

Paragraph.install = (Vue: VueConstructor) => {
  Vue.component(Paragraph.name, Paragraph);
};

export { Paragraph };
