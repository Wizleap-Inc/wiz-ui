import { SVG } from "./types";

/** ケバブケースをパスカルケースに変換する */
export const kebab2pascal = (str: string) =>
  str
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join("");

/** Iconコンポーネントをフレームワークにあわせて生成する */
export const createIcon = {
  vue: (svg: string, component: string) => `
    <template>
    ${svg}
    </template>
    
    <script setup lang="ts">
    import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
    
    defineOptions({
      name: ComponentName.I${component},
    });
    </script>
  `,
};

/** constants/component/icon-name.tsを生成する */
export const iconComponentName = (svgs: SVG[]) => `
  export const IconComponentName = {
    ${svgs
      .map((svg) => `I${svg.pascalName}: "WizI${svg.pascalName}"`)
      .join(",")}
  }`;

/** src/icons/index.tsを生成する */
export const indexFile = (svgs: SVG[]) => `
  ${svgs
    .map(
      (svg) =>
        `import { default as WizI${svg.pascalName} } from "./${svg.kebabName}.vue";`
    )
    .join("")}

  export type TIcon =
    ${svgs.map((svg) => `| typeof WizI${svg.pascalName}`).join("")};

  export {
    ${svgs.map((svg) => `WizI${svg.pascalName}`).join(",")}
  };`;
