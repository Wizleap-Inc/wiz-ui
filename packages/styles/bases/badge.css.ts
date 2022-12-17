import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const badgeStyle = style({
  position: "absolute",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: THEME.fontSize.xs3,
  height: THEME.fontSize.xs3,
});

export const badgeSizeStyle = styleVariants({
  sm: {
    width: THEME.fontSize.xl,
    height: THEME.fontSize.xl,
    fontSize: THEME.fontSize.xs3,
  },
  md: {
    width: THEME.fontSize.xl2,
    height: THEME.fontSize.xl2,
    fontSize: THEME.fontSize.xs2,
  },
  lg: {
    width: THEME.fontSize.xl3,
    height: THEME.fontSize.xl3,
    fontSize: THEME.fontSize.xs,
  },
});

export const badgeContainerStyle = style({
  position: "relative",
  width: "fit-content",
  height: "fit-content",
});
