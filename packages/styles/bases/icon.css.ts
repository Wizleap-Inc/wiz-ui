import { style, styleVariants } from "@vanilla-extract/css";
import { FONT_SIZE_MAP } from "@wizleap-inc/wiz-ui-constants";

export const iconStyle = style({
  lineHeight: 1,
  position: "relative",
});

export const iconSizeStyle = styleVariants(FONT_SIZE_MAP, (fontSize) => ({
  width: fontSize,
  height: fontSize,
}));

export const iconDefaultStyle = style({
  color: "currentColor",
});
