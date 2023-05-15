import path from "path";

import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    Dts({
      entryRoot: path.resolve(__dirname, "."),
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "Wiz-UI-Utils",
      fileName: (format) => `wiz-ui-utils.${format}.js`,
    },
  },
});
