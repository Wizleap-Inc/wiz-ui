export const SPACING_MAP = {
  no: "0",
  /** 4px */
  xs2: "0.25rem",
  /** 8px */
  xs: "0.5rem",
  /** 12px */
  sm: "0.75rem",
  /** 16px */
  md: "1rem",
  /** 20px */
  lg: "1.25rem",
  /** 24px */
  xl: "1.5rem",
  /** 32px */
  xl2: "2rem",
  /** 40px */
  xl3: "2.5rem",
  /** 48px */
  xl4: "3rem",
  max: "9999px",
  at: "auto",
} as const;

export type SpacingKeys = keyof typeof SPACING_MAP;

export const SPACING_ACCESSORS = Object.keys(SPACING_MAP) as SpacingKeys[];

export const getSpacingCss = (key?: SpacingKeys) =>
  key ? SPACING_MAP[key] : undefined;

export const getCoupleSpacingCss = (x?: SpacingKeys, y?: SpacingKeys): string =>
  `${getSpacingCss(x) || "no"} ${getSpacingCss(y) || "no"}`;
