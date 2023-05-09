import path from "path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import React from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    React(),
    Dts({
      entryRoot: path.resolve(__dirname, "src"),
    }),
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
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
