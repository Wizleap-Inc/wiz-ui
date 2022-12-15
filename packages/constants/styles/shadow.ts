export const SHADOW_MAP = {
  none: "none",
  sm: "0px 0px 4px #00000025",
  md: "0px 0px 4px #00000040",
};

export type ShadowKeys = keyof typeof SHADOW_MAP;

export const SHADOW_MAP_ACCESSORS = Object.keys(SHADOW_MAP) as ShadowKeys[];

export const getShadowCss = (key: ShadowKeys): string => SHADOW_MAP[key];
