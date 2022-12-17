export const FONT_SIZE_MAP = {
  /** 8px */
  xs3: "0.5rem",
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
  /** 36px */
  xl5: "2.25rem",
  /** 40px */
  xl6: "2.5rem",
} as const;

export type FontSizeKeys = keyof typeof FONT_SIZE_MAP;

export const FONT_SIZE_ACCESSORS = Object.keys(FONT_SIZE_MAP) as FontSizeKeys[];

export const getFontSizeCss = (key: FontSizeKeys): string => FONT_SIZE_MAP[key];

/**
 * Get relative font size key by diff index.
 *
 * @param key - Font size key.
 * @param diffIndex - Diff index.
 *
 * @returns Relative font size key.
 *
 * @example
 * ```ts
 * getRelativeFontSize("xl", 1); // "xl2"
 * getRelativeFontSize("xl", -1); // "lg"
 * getRelativeFontSize("xl6", 1); // "xl6" (max)
 * getRelativeFontSize("xs2", -1); // "xs2" (min)
 * ```
 */
export const getRelativeFontSize = (
  key: FontSizeKeys,
  diffIndex: number
): FontSizeKeys => {
  const index = FONT_SIZE_ACCESSORS.indexOf(key);
  const accessor = index + diffIndex;
  if (accessor < 0) {
    return FONT_SIZE_ACCESSORS[0];
  }
  if (accessor >= FONT_SIZE_ACCESSORS.length) {
    return FONT_SIZE_ACCESSORS[FONT_SIZE_ACCESSORS.length - 1];
  }
  return FONT_SIZE_ACCESSORS[accessor];
};
