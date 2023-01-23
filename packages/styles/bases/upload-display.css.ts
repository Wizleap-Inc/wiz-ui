import { style, keyframes } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";
const CARD_ANIMATION_TIME = "0.5s";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const fadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
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
});

export const circleCheckIconStyle = style({
  height: "1.5rem",
  width: "1.5rem",
});

export const attachFileIconStyle = style({
  fill: THEME.color.gray[700],
  height: "1.5rem",
  width: "1.5rem",
});

export const circleCheckIconDefaultStyle = style({
  fill: THEME.color.gray[400],
});

export const circleCheckIconCompletedStyle = style({
  fill: THEME.color.green[800],
});

export const uploadDisplayFadeInStyle = style({
  animationName: fadeIn,
  animationDuration: CARD_ANIMATION_TIME,
  animationTimingFunction: "ease-out",
  animationFillMode: "forwards",
});

export const uploadDisplayFadeOutStyle = style({
  animationName: fadeOut,
  animationDuration: CARD_ANIMATION_TIME,
  animationTimingFunction: "ease-out",
  animationFillMode: "forwards",
});
