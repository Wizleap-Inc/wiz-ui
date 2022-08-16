declare module "*.vue" {
  import Vue, { VueConstructor } from "vue";
  class ComponentWithInstall extends Vue {
    static install(Vue: VueConstructor<Vue>, options: any): void;
  }

  export default ComponentWithInstall;
}
