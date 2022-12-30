import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const textStyle = style({
  margin: 0,
});

export const textDefaultLineHeightStyle = style({
  lineHeight: "normal",
});

export const textFontWeightStle = styleVariants({
  default: {
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
});

export const textWordBreakStyle = style({
  wordBreak: "break-all",
});

export const textDummyStyle = style({
  filter: `blur(${THEME.spacing.xs2})`,
});
