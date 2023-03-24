/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const rimraf = require("rimraf");

const getSVGFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".svg")
    .map((file) => ({
      fileName: file.split(".")[0],
      svg: fs.readFileSync(path.join(dir, file), "utf-8"),
    }));

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

const SVG_DIR = path.join(__dirname, ".");
const CONSTANTS_DIR = path.join(__dirname, "../constants/");
const ICON_DIRS = [
  path.join(__dirname, "../wiz-ui/src/components/icons"),
  path.join(__dirname, "../wiz-ui-next/src/components/icons"),
];

const components = [];
getSVGFiles(SVG_DIR).forEach((file) => {
  const name = file.fileName
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");
  const vueFile = createIconVueFile(file.svg, name);
  components.push({
    fileName: file.fileName,
    name: name,
    vueFile: vueFile,
  });
});

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
  rimraf.sync(`${dir}/**/*.vue`);

  components.forEach((component) => {
    fs.writeFileSync(
      path.join(dir, component.fileName) + ".vue",
      component.vueFile
    );
  });

  fs.writeFileSync(path.join(dir, "index.ts"), indexFile);
});

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
