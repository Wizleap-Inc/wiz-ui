import vue from "@vitejs/plugin-vue2";

import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: ["types"],
      staticImport: true,
      insertTypesEntry: true,
      include: [path.resolve(__dirname, "packages")],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "WizUI",
      formats: ["es", "umd"],
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
