export const FONT_SIZE_MAP = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  xl2: "1.5rem",
  xl3: "1.75rem",
  xl4: "2rem",
} as const;

export type FontSizeKeys = keyof typeof FONT_SIZE_MAP;
