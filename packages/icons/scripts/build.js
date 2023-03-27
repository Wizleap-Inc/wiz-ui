/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const rimraf = require("rimraf");

const kebab2pascal = (str) =>
  str
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");

// icons/assets配下のsvgファイルを取得
const getSVGFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".svg")
    .map((file) => ({
      fileName: file.split(".")[0],
      svg: fs.readFileSync(path.join(dir, file), "utf-8"),
    }));

// Vueコンポーネントを生成
const createIconVueFile = (svg, component) => `
<template>
${svg}
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.I${component},
});
</script>
`;

const SVG_DIR = path.join(__dirname, "../assets/");
const CONSTANTS_DIR = path.join(__dirname, "../../constants/");
const ICON_DIRS = [
  path.join(__dirname, "../../wiz-ui/src/components/icons"),
  path.join(__dirname, "../../wiz-ui-next/src/components/icons"),
];

const components = getSVGFiles(SVG_DIR).map((file) => {
  const name = kebab2pascal(file.fileName);
  return {
    fileName: file.fileName,
    name: name,
    vueFile: createIconVueFile(file.svg, name),
  };
});

// constants/component/icon-name.tsを生成する
const iconComponentName = `
export const IconComponentName = {
  ${components
    .map((component) => `I${component.name}: "WizI${component.name}"`)
    .join(",")}
}`;
fs.writeFileSync(
  path.join(CONSTANTS_DIR, "component/icon-name.ts"),
  iconComponentName
);

// src/icons/index.tsを生成する
const indexFile = `
  ${components
    .map(
      (component) =>
        `import { default as WizI${component.name} } from "./${component.fileName}.vue";`
    )
    .join("")}

export type TIcon = 
  ${components.map((component) => `| typeof WizI${component.name}`).join("")};

export {
  ${components.map((component) => `WizI${component.name}`).join(",")}
};`;

ICON_DIRS.forEach((dir) => {
  rimraf.sync(`${dir}/**/*.vue`); // src/icons/*.vueをクリアする

  components.forEach((component) => {
    fs.writeFileSync(
      path.join(dir, component.fileName) + ".vue",
      component.vueFile
    );
  });

  fs.writeFileSync(path.join(dir, "index.ts"), indexFile);
});
