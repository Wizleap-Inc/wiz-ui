import { THEME } from "@/constants";
import { ColorKeys, ColorKeysSplit } from "@/types/styles/color";

export const getColorCss = (color: ColorKeys) => {
  const [k, v] = color.split(".") as ColorKeysSplit;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (v) return THEME.color[k][v];
  return THEME.color[k];
};
