export const FONT_WEIGHT_MAP = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontWeightKeys = keyof typeof FONT_WEIGHT_MAP;

export const FONT_WEIGHT_ACCESSORS = Object.keys(
  FONT_WEIGHT_MAP
) as FontWeightKeys[];

export const getFontWeightCss = (key: FontWeightKeys): number =>
  FONT_WEIGHT_MAP[key];
