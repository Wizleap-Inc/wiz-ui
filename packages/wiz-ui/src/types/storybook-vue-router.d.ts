declare module "storybook-vue-router" {
  export default function storyRouterDecorator(
    routes: import("vue-router").RouteConfig[]
  ): import("@storybook/vue-vite").StoryFnVueReturnType;
}
