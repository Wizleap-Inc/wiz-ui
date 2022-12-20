import { style, keyframes } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";
const BAR_HEIGHT = "6px";
const BAR_ANIMATION_TIME = "2s";
const CARD_ANIMATION_TIME = "0.5s";

const fadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const uploading = keyframes({
  "0%": { width: 0 },
  "100%": { width: "472px" },
});

export const uploadDisplayStyle = style({
  color: THEME.color.gray[700],
  fontSize: THEME.fontSize.sm,
  background: THEME.color.white[800],
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid",
  borderColor: THEME.color.gray[400],
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.md} ${THEME.spacing.xl}`,
  width: "504px",
});

export const uploadDisplayFadeOutStyle = style({
  animationName: fadeOut,
  animationDuration: CARD_ANIMATION_TIME,
  animationTimingFunction: "ease-out",
  animationFillMode: "forwards",
});

export const uploadDisplayBarBgStyle = style({
  height: BAR_HEIGHT,
  background: THEME.color.gray[400],
  borderRadius: THEME.spacing.xs2,
  width: "472px",
});

export const uploadDisplayBarStyle = style({
  position: "absolute",
  width: "472px",
  height: BAR_HEIGHT,
  background: THEME.color.green[800],
  borderRadius: THEME.spacing.xs2,
  animationName: uploading,
  animationDuration: BAR_ANIMATION_TIME,
  animationTimingFunction: `${BAR_ANIMATION_TIME} linear`,
});

export const checkCircleIconStyle = style({
  height: "1.5rem",
  width: "1.5rem",
});

export const attachFileIconStyle = style({
  fill: THEME.color.gray[700],
  height: "1.5rem",
  width: "1.5rem",
});

export const checkCircleIconDefaultStyle = style({
  fill: THEME.color.gray[400],
});

export const checkCircleIconDoneStyle = style({
  fill: THEME.color.green[800],
});
