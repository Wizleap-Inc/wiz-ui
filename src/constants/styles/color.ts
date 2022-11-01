import { ObjectKeysWithSeparator } from "../../types/utils/object";

import { getValueFromAccessor } from "./../../utils/object";

export const COLOR_MAP = {
  brand: {
    "900": "#3db783",
    "800": "#51CB97",
    "700": "#66DFAB",
    "600": "#70E9C0",
    "500": "#7BF2D4",
    "400": "#86FCE8",
    "300": "#9BFCF3",
    "200": "#AFFCF3",
    "100": "#C4FBF4",
    "50": "#D9FBF4",
    "0": "#E4FBF4",
  },
  blue: {
    "900": "#1d68a7",
    "400": "#66b1ff",
  },
  gradient: {
    "900": "linear-gradient(90deg, #3db783 0%, #099ec3 100%)",
  },
  error: {
    "900": "#da0076",
    "600": "#FCAFCF",
    "300": "#FBE4EF",
  },
  mono: {
    "900": "#000000",
    "800": "#1A1A1A",
    "700": "#333333",
    "600": "#4D4D4D",
    "500": "#666666",
    "400": "#808080",
    "300": "#999999",
    "200": "#B3B3B3",
    "100": "#CCCCCC",
    "50": "#E6E6E6",
    "0": "#FFFFFF",
  },
  transparent: "transparent",
} as const;

export type ColorKeys = ObjectKeysWithSeparator<typeof COLOR_MAP>;

interface ColorPropsItems {
  color: ColorKeys;
  bgColor: ColorKeys;
}

export type ColorProps = Partial<ColorPropsItems>;

export const getColors = (color: ColorKeys) =>
  getValueFromAccessor(COLOR_MAP, color);
