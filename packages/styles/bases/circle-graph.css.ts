import { keyframes, style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const GRAPH_COLORS = [
  THEME.color.green[700],
  THEME.color.green[600],
  THEME.color.green[500],
  THEME.color.green[400],
  THEME.color.gray[300],
];

const VERTICAL_GAP = THEME.spacing.lg;
const LABEL_AREA_HEIGHT = THEME.fontSize.xl;

export const CircleBarBgStyle = style({
  fill: "none",
  stroke: GRAPH_COLORS[GRAPH_COLORS.length - 1],
});

const progress = keyframes({
  "0%": {
    strokeDasharray: "0 100",
  },
});

export const CircleBarStyle = style({
  fill: "none",
  strokeLinecap: "round",
  animation: `${progress} 1s ease-in-out forwards`,
});

export const CircleBarContainerStyle = style({
  position: "relative",
  width: "100%",
  height: `calc(100% - ${LABEL_AREA_HEIGHT} - ${VERTICAL_GAP})`,
});

export const CircleBarSVGStyle = style({
  width: "100%",
  height: "100%",
});

export const CircleBarPercentageStyle = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  width: "max-content",
  height: "max-content",
  fontWeight: "bold",
  fontSize: "0.2em",
});

export const CircleGraphStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: VERTICAL_GAP,
});

export const CircleGraphLabelContainerStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: THEME.spacing.xl,
  flexWrap: "wrap",
  height: LABEL_AREA_HEIGHT,
});

export const CircleGraphLabelStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: THEME.spacing.xs2,
});

export const CircleGraphLabelItemStyle = style({
  fontSize: THEME.fontSize.xs,
});

export const CircleGraphLabelIconStyle = style({
  display: "block",
  width: THEME.fontSize.sm,
  height: THEME.fontSize.sm,
  borderRadius: THEME.spacing.max,
});
