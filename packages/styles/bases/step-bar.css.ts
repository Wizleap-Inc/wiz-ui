import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const stepBarStyle = style({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  height: "100%",
  position: "relative",
});

const baseProgressBarItemStyle = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  position: "relative",
});

export const stepBarItemStyle = styleVariants({
  default: [
    baseProgressBarItemStyle,
    {
      width: "100%",
    },
  ],
  first: [
    baseProgressBarItemStyle,
    {
      width: "auto",
    },
  ],
});

export const progressBarItemLabelStyle = style({
  position: "absolute",
  bottom: `calc(${THEME.spacing.md} * -1)`,
  left: "50%",
  transform: "translateX(-50%)",
});

const PROGRESS_POINT_SIZE = THEME.fontSize.md;

export const stepLineStyle = style({
  position: "absolute",
  top: `calc(${PROGRESS_POINT_SIZE} * 0.5)`,
  right: `calc(${PROGRESS_POINT_SIZE} * 0.5)`,
  height: "1px",
});

export const stepLineBackgroundStyle = styleVariants({
  inactive: {
    background: THEME.color.gray[300],
  },
  active: {
    background: THEME.color.green[800],
  },
});

export const stepLineWidthStyle = styleVariants({
  default: {
    width: "100%",
  },
  first: {
    width: 0,
  },
});

const PROGRESS_POINT_DASH_WIDTH = "2px"; // 波線の点の幅

export const stepPointStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: PROGRESS_POINT_SIZE,
  height: PROGRESS_POINT_SIZE,
  borderRadius: "50%",
  color: THEME.color.white[800],
  borderWidth: "2px",
  boxSizing: "border-box",
  fontWeight: "bold",
  zIndex: 1,
  position: "relative",

  ":before": {
    content: "",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `calc(100% - ${PROGRESS_POINT_DASH_WIDTH} * 2)`,
    height: `calc(100% - ${PROGRESS_POINT_DASH_WIDTH} * 2)`,
    borderRadius: "50%",
  },
});

export const stepPointValueStyle = style({
  zIndex: 2,
  fontSize: THEME.fontSize.xl6,
  position: "relative",
  backgroundColor: "white",
});
