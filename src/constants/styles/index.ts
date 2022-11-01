import { BREAKPOINT_MAP } from "./breakpoint";
import { COLOR_MAP } from "./color";
import { FONT_SIZE_MAP } from "./fontSize";
import { SPACING_MAP } from "./spacing";

export const THEME = {
  color: COLOR_MAP,
  spacing: SPACING_MAP,
  fontSize: FONT_SIZE_MAP,
  breakpoint: BREAKPOINT_MAP,
} as const;
