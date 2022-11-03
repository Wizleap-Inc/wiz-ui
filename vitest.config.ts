/// <reference types="vitest" />
import { resolve } from "path";

import vue from "@vitejs/plugin-vue2";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      clean: false,
      include: ["src/**/*.{ts,vue}"],
      exclude: [
        "src/**/*.stories.ts",
        "src/**/index.ts",
        "src/types/**/*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
