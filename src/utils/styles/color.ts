import { THEME } from "@/constants";
import { ColorSelects } from "@/types/styles/color";

type ColorSelectsSplit = ColorSelects extends `${infer Keys}`
  ? Keys extends `${infer Key}.${infer Rest}`
    ? [Key, Rest]
    : [Keys]
  : never;

export const getColorCss = (color: ColorSelects) => {
  const [k, v] = color.split(".") as ColorSelectsSplit;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (v) return THEME.color[k][v];
  return THEME.color[k];
};
