export const COLOR_MAP = {
  green: {
    "300": "#E4FBF4",
    "400": "#D1F0E2",
    "500": "#AAE3CB",
    "600": "#84D6B3",
    "700": "#5EC99B",
    "800": "#3DB783",
  },
  blue: {
    "300": "#DFF7FE",
    "400": "#BEF0FC",
    "500": "#6DDDF8",
    "600": "#2CCDF5",
    "700": "#0BB8E3",
    "800": "#099EC3",
  },
  red: {
    "300": "#FDF0EE",
    "400": "#FAD4CF",
    "500": "#F7B8B0",
    "600": "#F49D91",
    "700": "#F18172",
    "800": "#EE6653",
  },
  yellow: {
    "300": "#FDF8EC",
    "400": "#FAE9BC",
    "500": "#F5D37D",
    "600": "#F1C44E",
    "700": "#EFB92E",
    "800": "#E9AD12",
  },
  gray: {
    "300": "#EEF0EF",
    "400": "#D3D8D7",
    "500": "#AFB8B6",
    "600": "#82908C",
    "700": "#616D6A",
    "800": "#32443E",
    "900": "#183028",
  },
  white: {
    "500": "#FFFFFFb2", // 70%
    "800": "#FFFFFF",
  },
  gradient: "linear-gradient(90deg, #3db783 0%, #099ec3 100%)",
  transparent: "transparent",
} as const;

export const COLOR_MAP_ACCESSORS = (() => {
  const accessors: string[] = [];
  for (const [color, shades] of Object.entries(COLOR_MAP)) {
    if (typeof shades === "string") {
      accessors.push(color);
    } else {
      for (const shade of Object.keys(shades)) {
        accessors.push(`${color}.${shade}`);
      }
    }
  }
  return accessors;
})();
