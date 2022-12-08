import path from "path";

import Vue from "@vitejs/plugin-vue2";
import DefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [Vue(), Dts(), DefineOptions()],
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
