import { styleVariants } from "@vanilla-extract/css";
import { FONT_SIZE_MAP } from "@wizleap-inc/wiz-ui-constants";

export const lineHeightStyle = styleVariants(FONT_SIZE_MAP, (lineHeight) => ({
  lineHeight,
}));
