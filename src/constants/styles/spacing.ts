import { CSSProperties } from "vue/types/jsx";

export const SPACING_MAP = {
  no: "0",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  xl2: "2rem",
  xl3: "2.5rem",
  xl4: "3rem",
  at: "auto",
} as const;

type SpacingKeys = keyof typeof SPACING_MAP;

export interface SpacingPropsItems {
  m: SpacingKeys;
  mt: SpacingKeys;
  mr: SpacingKeys;
  mb: SpacingKeys;
  ml: SpacingKeys;
  mx: SpacingKeys;
  my: SpacingKeys;
  p: SpacingKeys;
  pt: SpacingKeys;
  pr: SpacingKeys;
  pb: SpacingKeys;
  pl: SpacingKeys;
  px: SpacingKeys;
  py: SpacingKeys;
  gap: SpacingKeys;
}

export type SpacingProps = Partial<SpacingPropsItems>;

export const getSpacing = (spacing: SpacingKeys) => SPACING_MAP[spacing];

export const getSpacingValue = (spacing: SpacingKeys) => {
  const value = getSpacing(spacing);
  return value ? `${value}` : value;
};

export const getSpacingCSS = (spacings: SpacingProps): CSSProperties => {
  const css: CSSProperties = {};
  for (const [key, value] of Object.entries(spacings)) {
    if (!value) continue;
    const spacingValue = getSpacingValue(value);
    if (!spacingValue) continue;
    if (!css[key]) continue;
    css[key] = spacingValue;
  }
  return css;
};
