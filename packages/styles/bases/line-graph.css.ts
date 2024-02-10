import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BAR_HEIGHT = "6px";

export const lineGraphBaseBgStyle = style({
  position: "relative",
  height: BAR_HEIGHT,
  background: THEME.color.gray[400],
  borderRadius: THEME.spacing.xs2,
  width: "100%",
});

export const lineGraphBgStyle = styleVariants({
  default: {
    background: THEME.color.gray[400],
  },
  hidden: {
    background: "none",
  },
});

export const lineGraphBarStyle = style({
  position: "absolute",
  height: BAR_HEIGHT,
  background: THEME.color.green[800],
  borderRadius: THEME.spacing.xs2,
});
