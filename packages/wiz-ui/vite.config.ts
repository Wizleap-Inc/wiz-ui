import path from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import Vue from "@vitejs/plugin-vue2";
import DefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    Vue(),
    Dts({
      entryRoot: path.resolve(__dirname, "src"),
    }),
    DefineOptions(),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Wiz-UI",
      fileName: (format) => `wiz-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
