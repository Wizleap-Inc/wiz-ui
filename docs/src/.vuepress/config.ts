import { resolve } from "path";
import { defineConfig, UserPlugins } from "vuepress/config";
import { getSidebar } from "./config/sidebar";
import { description } from "../../package.json";

const plugins = [
  "@vuepress/plugin-back-to-top",
  "@vuepress/plugin-medium-zoom",
  "@wizleap-inc/vuepress-plugin-wiz-ui",
  "vuepress-plugin-copy-code1",
] as UserPlugins;

export default defineConfig((ctx) => ({
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Wiz UI Docs",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Component",
        link: "/component/",
      },
      {
        text: "Storybook",
        link: "https://d39bx35pq0h9vg.cloudfront.net/wiz-ui/storybook/latest/index.html",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: ["", "setup", "develop", "structure", "contributing"],
        },
      ],
      "/component/": [
        getSidebar("base", resolve(process.cwd(), "src/component/base")),
        getSidebar("custom", resolve(process.cwd(), "src/component/custom")),
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins,
}));
