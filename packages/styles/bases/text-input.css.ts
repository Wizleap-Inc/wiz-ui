import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const textInputStyle = style({
  position: "relative",
});

export const textInputExpandStyle = styleVariants({
  default: {
    width: "fit-content",
  },
  expand: {
    width: "100%",
  },
});

export const textInputIconStyle = style({
  position: "absolute",
  left: THEME.spacing.xs,
  top: "0",
  bottom: "0",
  margin: "auto",
  display: "flex",
  background: "none",
  border: "none",
  alignItems: "center",
  justifyContent: "center",
  fontSize: THEME.fontSize.xl2,
  lineHeight: THEME.fontSize.xl2,
  width: THEME.fontSize.xl2,
  height: THEME.fontSize.xl2,
  padding: THEME.spacing.no,
  fill: THEME.color.gray[500],
});
