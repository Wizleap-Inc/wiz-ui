import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
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
  viteFinal: async (config) => {
    const storybookDir = path.dirname(fileURLToPath(import.meta.url));
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      alias: {
        "@": path.resolve(storybookDir, "../src"),
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

export default config;
