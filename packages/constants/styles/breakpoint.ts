export const BREAKPOINT_MAP = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
} as const;

export type BreakpointKeys = keyof typeof BREAKPOINT_MAP;

export const BREAKPOINT_MAP_ACCESSORS = Object.keys(
  BREAKPOINT_MAP
) as BreakpointKeys[];

export const getBreakpointCss = (breakpoint: BreakpointKeys) =>
  BREAKPOINT_MAP[breakpoint];
