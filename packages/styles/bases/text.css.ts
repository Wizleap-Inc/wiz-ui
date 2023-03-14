import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const textStyle = style({
  margin: 0,
});

export const textDefaultLineHeightStyle = style({
  lineHeight: "normal",
});

export const textFontWeightStyle = styleVariants({
  default: {
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
});

export const textAlignStyle = styleVariants({
  start: {
    textAlign: "start",
  },
  end: {
    textAlign: "end",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
});

export const textWordBreakStyle = style({
  wordBreak: "break-all",
});

export const textDummyStyle = style({
  filter: `blur(${THEME.spacing.xs2})`,
});

export const textLineThroughStyle = style({
  textDecoration: "line-through",
});
