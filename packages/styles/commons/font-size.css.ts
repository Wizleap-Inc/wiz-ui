import { styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const fontSizeStyle = styleVariants(THEME.fontSize, (fontSize) => ({
  fontSize,
}));
