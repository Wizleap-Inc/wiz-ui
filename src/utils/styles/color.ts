import { COLOR_MAP } from "@/constants/styles/color";
import { ColorKeys } from "@/types/styles/color";

type ColorKey<T> = T extends Record<infer U, infer V> ? [U, V] : never;

export const getColorCss = (color: ColorKeys) => {
  const [key, value] = color.split(".") as ColorKey<typeof COLOR_MAP>;
  if (typeof value === "string") return COLOR_MAP[key];
  return COLOR_MAP[key][value];
};
