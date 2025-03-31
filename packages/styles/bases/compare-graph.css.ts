import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const graphBodyStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
});

const SHADOW_AS_BORDER = [
  "1px 1px",
  "1px 0",
  "1px -1px",
  "0 1px",
  "0 -1px",
  "-1px 1px",
  "-1px 0",
  "-1px -1px",
]
  .map((pos) => `${pos} 0 ${THEME.color.white["800"]}`)
  .join(", ");

export const summaryLabelStyle = style({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
});

export const summaryLabelRateStyle = style({
  fontSize: THEME.fontSize.xl2,
});

export const summaryLabelSentenceStyle = style({
  fontSize: THEME.fontSize.sm,
});

const GRAPH_BODY_HEIGHT = "11rem";
const BAR_LABEL_HEIGHT = "2rem";
const BAR_WIDTH = "60px";

export const graphContainerStyle = style({
  width: "100%",
  height: `calc(${GRAPH_BODY_HEIGHT} + ${BAR_LABEL_HEIGHT})`,
  marginBottom: BAR_LABEL_HEIGHT,
  display: "flex",
  justifyContent: "center",
});

export const graphSideStyle = style({
  position: "relative",
  width: "40px",
  flexShrink: 0,
});

export const graphSideLabelStyle = style({
  position: "absolute",
  margin: "auto",
  right: "10px",
  fontSize: THEME.fontSize.sm,
  whiteSpace: "nowrap",
  color: THEME.color.gray[700],
  textAlign: "center",
  fontWeight: THEME.fontWeight.bold,
});

export const graphSideLabelPositionStyle = styleVariants({
  max: {
    top: 0,
  },
  half: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  unit: {
    bottom: 0,
  },
});

export const graphContainerBodyStyle = style({
  flex: 1,
  border: `solid ${THEME.color.gray[600]}`,
  borderWidth: `0 0 ${THEME.borderWidth.xs} ${THEME.borderWidth.xs}`,
  position: "relative",
  maxWidth: "100%",
});

export const graphBarStyle = style({
  width: BAR_WIDTH,
  height: "100%",
  position: "relative",
  boxSizing: "content-box",
  flex: 1,
});

export const graphBarItemStyle = style({
  borderRadius: THEME.spacing.xs2,
  position: "absolute",
  width: BAR_WIDTH,
  margin: "auto",
  left: 0,
  right: 0,
  bottom: 0,
});

export const graphBarItemIndexStyle = styleVariants({
  last: {
    backgroundColor: THEME.color.gray[300],
  },
  current: {
    backgroundColor: THEME.color.green[700],
  },
});

export const graphBarNumberStyle = style({
  position: "absolute",
  left: 0,
  right: 0,
  margin: "auto",
  width: "max-content",
  fontSize: THEME.fontSize.xs,
  lineHeight: THEME.fontSize.md,
});

export const graphBarLabelStyle = style({
  position: "absolute",
  bottom: `calc(-1 * ${BAR_LABEL_HEIGHT})`,
  left: "50%",
  width: "max-content",
  fontSize: THEME.fontSize.sm,
  fontWeight: THEME.fontWeight.bold,
  color: THEME.color.gray[700],
});

export const graphBarCompareStyle = style({
  position: "absolute",
  right: `calc((100% - ${BAR_WIDTH}) / 2 + ${BAR_WIDTH})`,
  width: `calc(100% - ${BAR_WIDTH})`,
});

export const graphBarCompareLineStyle = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  margin: "auto",
  border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[400]}`,
  transformOrigin: "left top",
});

export const graphBarCompareLabelStyle = style({
  zIndex: 1,
  position: "absolute",
  textAlign: "center",
  margin: "auto",
  left: 0,
  right: 0,
  fontWeight: THEME.fontWeight.bold,
  fontSize: THEME.fontSize.xs,
  textShadow: SHADOW_AS_BORDER,
  color: THEME.color.gray[700],
  height: "50px",
});
