const path = require("path");
const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin");
const { mergeConfig } = require("vite");
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/vue-vite",
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
};
