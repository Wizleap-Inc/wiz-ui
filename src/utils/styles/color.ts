import { THEME } from "@/constants";
import { ColorKeys } from "@/types/styles/color";

type ColorKeysSplit = ColorKeys extends `${infer Keys}`
  ? Keys extends `${infer Key}.${infer Rest}`
    ? [Key, Rest]
    : [Keys]
  : never;

export const getColorCss = (color: ColorKeys) => {
  const [k, v] = color.split(".") as ColorKeysSplit;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (v) return THEME.color[k][v];
  return THEME.color[k];
};
