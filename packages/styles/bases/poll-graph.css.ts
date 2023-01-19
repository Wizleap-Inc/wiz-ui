import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const EACH_POLL_GAP = THEME.spacing.sm;
const LABEL_WIDTH = "80px";
export const DIVIDER_WIDTH = "1px";
const BAR_INNER_LABEL_HEIGHT = THEME.fontSize.lg;
const BAR_INNER_LABEL_PADDING_Y = THEME.spacing.xs2;

export const PollGraphWrapperStyle = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: EACH_POLL_GAP,
});

export const PollGraphStyle = style({
  backgroundColor: THEME.color.gray[300],
  borderRadius: THEME.spacing.max,
});

export const PollBodyStyle = style({
  height: "100%",
  borderRadius: THEME.spacing.max,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  transition: "width 0.5s ease-in-out",
});

export const PollGraphInnerLabelStyle = style({
  fontSize: THEME.fontSize.xs2,
  lineHeight: BAR_INNER_LABEL_HEIGHT,
  padding: `${BAR_INNER_LABEL_PADDING_Y} ${THEME.spacing.sm}`,
  height: "min-content",
  color: THEME.color.white[800],
  whiteSpace: "nowrap",
});

export const PollRowStyle = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: `calc(${BAR_INNER_LABEL_HEIGHT} + ${BAR_INNER_LABEL_PADDING_Y} * 2)`,
});

export const PollLabelStyle = style({
  fontSize: THEME.fontSize.xs,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  lineHeight: THEME.fontSize.xs,
  width: LABEL_WIDTH,
  flexShrink: 0,
});

export const PollGraphDividerStyle = style({
  position: "absolute",
  top: 0,
  width: DIVIDER_WIDTH,
  backgroundColor: THEME.color.gray[600],
});

export const PollStyle = style({
  width: `calc(100% - ${LABEL_WIDTH})`,
});
