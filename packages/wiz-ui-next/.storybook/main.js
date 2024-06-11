import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";
import { mergeConfig } from "vite";
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storycap",
  ],
  framework: "@storybook/vue3-vite",
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
      base: "./",
    });
  },
  staticDirs: [
    {
      from: "./assets",
      to: "/public",
    },
  ],
  docs: {
    docsPage: "automatic",
    defaultName: "Docs",
    autodocs: true,
  },
};
