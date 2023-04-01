import fs from "fs";
import path from "path";

import { rimrafSync } from "rimraf";

import { CURRENT_DIR, WIZ_UI_CONSTANTS_DIR, WIZ_UI_SVG_DIR } from "./constants";
import { Component, SVG } from "./types";
import {
  createIcon,
  iconComponentName,
  indexFile,
  kebab2pascal,
} from "./utils";

// SVGファイルを取得
const SVGs: SVG[] = fs
  .readdirSync(WIZ_UI_SVG_DIR)
  .filter((file) => path.extname(file) === ".svg")
  .map((file) => ({
    kebabName: file.split(".")[0],
    pascalName: kebab2pascal(file.split(".")[0]),
    svgFile: fs.readFileSync(path.join(WIZ_UI_SVG_DIR, file), "utf-8"),
  }));

fs.writeFileSync(
  path.join(WIZ_UI_CONSTANTS_DIR, "component/icon-name.ts"),
  iconComponentName(SVGs)
);

// Vue用のコンポーネントを生成
const vueComponents: Component[] = SVGs.map((svg) => ({
  svg: svg,
  componentFile: createIcon.vue(svg.svgFile, svg.pascalName),
  framework: "vue",
}));

const icons: { dist: string; components: Component[] }[] = [
  {
    dist: path.join(CURRENT_DIR, "../../wiz-ui/src/components/icons"),
    components: vueComponents,
  },
  {
    dist: path.join(CURRENT_DIR, "../../wiz-ui-next/src/components/icons"),
    components: vueComponents,
  },
];

icons.forEach((icon) => {
  // 既存のファイルを削除
  fs.readdirSync(icon.dist)
    .filter((file) =>
      [".vue", ".tsx", "ts"].some((ext) => path.extname(file) === ext)
    )
    .forEach((file) => {
      rimrafSync(path.join(icon.dist, file));
    });

  // 新しいIconファイルを生成
  icon.components.forEach((component) => {
    const ext = component.framework === "vue" ? ".vue" : ".tsx";
    fs.writeFileSync(
      path.join(icon.dist, component.svg.kebabName) + ext,
      component.componentFile
    );
  });

  // index.tsを生成
  fs.writeFileSync(
    path.join(icon.dist, "index.ts"),
    indexFile(icon.components.map((component) => component.svg))
  );
});
