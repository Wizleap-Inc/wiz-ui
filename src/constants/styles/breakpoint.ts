export const BREAKPOINT_MAP = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export type BreakpointKeys = keyof typeof BREAKPOINT_MAP;
