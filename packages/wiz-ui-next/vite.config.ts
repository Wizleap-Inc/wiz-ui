import path from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import Vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import { visualizer } from "rollup-plugin-visualizer";
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
    visualizer(),
    copy({
      targets: [
        {
          src: path.resolve(__dirname, "../../third-parties"),
          dest: path.resolve(__dirname, "dist"),
        },
        {
          src: path.resolve(__dirname, "../../LICENSE"),
          dest: path.resolve(__dirname, "dist"),
        },
      ],
      hook: "writeBundle",
      copyOnce: true,
    }),
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
      cssFileName: "style",
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
  define: {
    __VUE_OPTIONS_API__: false,
  },
});
