export const FONT_SIZE_MAP = {
  /** 10px */
  xs2: "0.625rem",
  /** 12px */
  xs: "0.75rem",
  /** 14px */
  sm: "0.875rem",
  /** 16px */
  md: "1rem",
  /** 18px */
  lg: "1.125rem",
  /** 20px */
  xl: "1.25rem",
  /** 24px */
  xl2: "1.5rem",
  /** 28px */
  xl3: "1.75rem",
  /** 32px */
  xl4: "2rem",
} as const;

export type FontSizeKeys = keyof typeof FONT_SIZE_MAP;
