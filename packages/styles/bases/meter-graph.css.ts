import { style, keyframes } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

// svg circleのpercentageを80%maxにすることでMETERを表現する
export const MAX_PERCENTAGE = 80;
export const STROKE_WIDTH = 1.8;
export const VIEW_BOX_SIZE = 36;
export const HALF_VIEW_BOX_SIZE = VIEW_BOX_SIZE / 2;
export const RADIUS = 100 / (2 * Math.PI);
export const DIAMETER = RADIUS * 2;
export const MARGIN_OF_CIRCLE = (VIEW_BOX_SIZE - DIAMETER) / 2;

const VERTICAL_GAP = THEME.spacing.lg;
const LABEL_AREA_HEIGHT = THEME.fontSize.xl;

export const MeterBarBgStyle = style({
  fill: "none",
  strokeLinecap: "round",
  stroke: THEME.color.gray[300],
});

const progress = keyframes({
  "0%": {
    strokeDasharray: "0 100",
  },
});

export const MeterBarStyle = style({
  fill: "none",
  strokeLinecap: "round",
  animation: `${progress} 1s ease-in-out forwards`,
});

export const MeterBarContainerStyle = style({
  position: "relative",
  width: "100%",
  height: `calc(100% - ${LABEL_AREA_HEIGHT} - ${VERTICAL_GAP})`,
});

export const MeterBarSVGStyle = style({
  width: "100%",
  height: "100%",
});

export const MeterBarPercentageStyle = style({
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

export const MeterGraphStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: VERTICAL_GAP,
});

export const MeterGraphLabelContainerStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: THEME.spacing.xl,
  flexWrap: "wrap",
  height: LABEL_AREA_HEIGHT,
});

export const MeterGraphLabelStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: THEME.spacing.xs2,
});

export const MeterGraphLabelItemStyle = style({
  fontSize: THEME.fontSize.xs,
});
