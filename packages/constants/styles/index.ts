import { BREAKPOINT_MAP } from "./breakpoint";
import { COLOR_MAP } from "./color";
import { FONT_SIZE_MAP } from "./font-size";
import { SHADOW_MAP } from "./shadow";
import { SHARE } from "./share";
import { SPACING_MAP } from "./spacing";
import { Z_INDEX_MAP } from "./z-index";

export const THEME = {
  color: COLOR_MAP,
  spacing: SPACING_MAP,
  fontSize: FONT_SIZE_MAP,
  breakpoint: BREAKPOINT_MAP,
  shadow: SHADOW_MAP,
  zIndex: Z_INDEX_MAP,
  share: SHARE,
} as const;

export * from "./breakpoint";
export * from "./color";
export * from "./font-size";
export * from "./shadow";
export * from "./share";
export * from "./spacing";
export * from "./z-index";
export * from "./white-space";
