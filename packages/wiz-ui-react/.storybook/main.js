const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin");
const path = require("path");
const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storycap",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  features: {
    interactionsDebugger: true,
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
    defaultName: "Docs",
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
