import { style, styleVariants } from "@vanilla-extract/css";
import { THEME, FLAT_COLOR_MAP } from "@wizleap-inc/wiz-ui-constants";

const BORDER_RADIUS_SM = THEME.spacing.xs2;
const BORDER_RADIUS_MD = "100px";
const BAR_HEIGHT_SM = "6px";
const BAR_HEIGHT_MD = "16px";

const baseContainerStyle = style({
  position: "relative",
  background: THEME.color.gray[400],
  width: "100%",
});

export const lineGraphContainerStyle = styleVariants({
  sm: [
    baseContainerStyle,
    {
      height: BAR_HEIGHT_SM,
      borderRadius: BORDER_RADIUS_SM,
    },
  ],
  md: [
    baseContainerStyle,
    {
      height: BAR_HEIGHT_MD,
      borderRadius: BORDER_RADIUS_MD,
    },
  ],
});

export const lineGraphBgStyle = styleVariants({
  default: {
    background: THEME.color.gray[400],
  },
  hidden: {
    background: "none",
  },
});

const baseBarStyle = style({
  position: "absolute",
});

export const lineGraphBarSizeStyle = styleVariants({
  sm: [
    baseBarStyle,
    {
      height: BAR_HEIGHT_SM,
      borderRadius: BORDER_RADIUS_SM,
    },
  ],
  md: [
    baseBarStyle,
    {
      height: BAR_HEIGHT_MD,
      borderRadius: BORDER_RADIUS_MD,
    },
  ],
});

export const lineGraphBarColorStyle = styleVariants(
  FLAT_COLOR_MAP,
  (background) => ({
    background,
  })
);
