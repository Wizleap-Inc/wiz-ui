export type SVG = {
  kebabName: string;
  pascalName: string;
  svgFile: string;
};

export type Component = {
  componentFile: string;
  svg: SVG;
  framework: "vue" | "react";
};
