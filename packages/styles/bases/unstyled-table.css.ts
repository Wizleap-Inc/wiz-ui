import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const unstyledTdStyle = style({
  fontSize: THEME.fontSize.sm,
  padding: 0,
});

export const unstyledTdAlignStyle = styleVariants({
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});

export const unstyledTh = style({
  fontSize: THEME.fontSize.sm,
  fontWeight: "bold",
});
