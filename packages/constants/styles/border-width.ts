export const BORDER_WIDTH_MAP = {
  xs: "1px",
  sm: "2px",
  md: "3px",
  lg: "4px",
} as const;

export type BorderWidthKeys = keyof typeof BORDER_WIDTH_MAP;

export const BORDER_WIDTH_ACCESSORS = Object.keys(
  BORDER_WIDTH_MAP
) as BorderWidthKeys[];

export const getFontWidthCss = (key: BorderWidthKeys): string =>
  BORDER_WIDTH_MAP[key];
