import { styleVariants } from "@vanilla-extract/css";
import { FONT_SIZE_MAP } from "@wizleap-inc/wiz-ui-constants";

export const fontSizeStyle = styleVariants(FONT_SIZE_MAP, (fontSize) => ({
  fontSize,
}));

export const fontSizeAsHeightStyle = styleVariants(
  FONT_SIZE_MAP,
  (fontSize) => ({
    height: fontSize,
  })
);
