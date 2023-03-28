import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const progressBarStyle = style({
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

export const progressBarItemStyle = styleVariants({
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

export const progressBarPointWrapperStyle = style({
  position: "relative",
});

export const progressBarItemLabelStyle = style({
  position: "absolute",
  bottom: `calc(${THEME.spacing.md} * -1)`,
  left: "50%",
  transform: "translateX(-50%)",
});

export const progressBarItemAnnotationStyle = style({
  position: "absolute",
  top: `calc(${THEME.spacing.md} * -1)`,
  left: "50%",
  transform: "translateX(-50%)",
  color: THEME.color.red[800],
});

const PROGRESS_POINT_SIZE = THEME.fontSize.md;

export const progressLineStyle = style({
  position: "absolute",
  top: `calc(${PROGRESS_POINT_SIZE} * 0.5)`,
  right: `calc(${PROGRESS_POINT_SIZE} * 0.5)`,
  height: "1px",
});

export const progressLineBackgroundStyle = styleVariants({
  inactive: {
    background: THEME.color.gray[300],
  },
  active: {
    background: THEME.color.green[800],
  },
});

export const progressLineWidthStyle = styleVariants({
  default: {
    width: "100%",
  },
  first: {
    width: 0,
  },
});

const PROGRESS_POINT_DASH_NUM = 8; // 波線の点の数
const PROGRESS_POINT_DASH_WIDTH = "2px"; // 波線の点の幅

export const progressPointStyle = style({
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

export const progressPointVariantStyle = styleVariants({
  done: {
    background: THEME.color.green[300],
    borderColor: THEME.color.green[800],
    borderStyle: "solid",
  },
  active: {
    background: THEME.color.green[800],
    borderColor: THEME.color.green[800],
    borderStyle: "solid",
  },
  inactive: {
    background: THEME.color.gray[300],
    borderColor: THEME.color.gray[300],
    borderStyle: "solid",
  },
  pending: {
    background: `repeating-conic-gradient(${THEME.color.green[800]} 0 calc(360deg / ${PROGRESS_POINT_DASH_NUM} / 2), ${THEME.color.green[300]} 0 calc(360deg / ${PROGRESS_POINT_DASH_NUM}))`,
    position: "relative",
    ":before": {
      background: THEME.color.green[300],
    },
  },
  dead: {
    background: `repeating-conic-gradient(${THEME.color.gray[800]} 0 calc(360deg / ${PROGRESS_POINT_DASH_NUM} / 2), ${THEME.color.gray[300]} 0 calc(360deg / ${PROGRESS_POINT_DASH_NUM}))`,
    position: "relative",
    ":before": {
      background: THEME.color.gray[300],
    },
  },
});

export const progressPointValueStyle = style({
  zIndex: 2,
  fontSize: THEME.fontSize.xs2,
});

export const progressPointValueColorStyle = styleVariants({
  inactive: {
    color: THEME.color.gray[800],
  },
  active: {
    color: THEME.color.white[800],
  },
});
