import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tooltipStyle = style({
  position: "relative",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[800],
});

export const tooltipContentStyle = style({
  position: "absolute",
  width: "max-content",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "30px",
  backgroundColor: THEME.color.gray[800],
  color: THEME.color.white[800],
  fontSize: THEME.fontSize.xs2,
  borderRadius: THEME.spacing.xs,
  padding: THEME.spacing.xs,
  display: "inline-block",
  whiteSpace: "pre-wrap",
  selectors: {
    [`${tooltipStyle}:hover > &`]: {
      visibility: "visible",
      opacity: 1,
    },
    [`${tooltipStyle}:not(:hover) > &`]: {
      visibility: "hidden",
      opacity: 0,
    },
  },
});

export const tooltipIconStyle = style({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%) scale(1, -1)",
  bottom: "-12px",
  fill: THEME.color.gray[800],
  width: THEME.fontSize.md,
  height: THEME.fontSize.md,
});
