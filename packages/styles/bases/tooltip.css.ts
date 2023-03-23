import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tooltipStyle = style({
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[800],
});

export const tooltipPopupStyle = style({
  transition: "opacity 0.2s",
  display: "flex",
  gap: `calc(${THEME.spacing.xs} * -1)`,
  alignItems: "center",
  justifyContent: "stretch",
  width: "max-content",
});

export const tooltipContentStyle = style({
  backgroundColor: THEME.color.gray[800],
  borderRadius: THEME.spacing.xs2,
  padding: THEME.spacing.xs,
  whiteSpace: "pre-wrap",
  boxSizing: "border-box",
  color: THEME.color.white[800],
  fontSize: THEME.fontSize.xs2,
});

export const tooltipIconStyle = style({
  fill: THEME.color.gray[800],
  width: THEME.fontSize.md,
  height: THEME.fontSize.md,
  margin: `calc(${THEME.spacing.xs2} * -1 )`,
});

export const tooltipIconDirectionStyle = styleVariants({
  top: {
    transform: "rotate(180deg)",
  },
  bottom: {
    transform: "rotate(0deg)",
  },
  left: {
    transform: "rotate(90deg)",
  },
  right: {
    transform: "rotate(270deg)",
  },
});

export const tooltipPositionStyle = styleVariants({
  top: {
    flexDirection: "column",
  },
  bottom: {
    flexDirection: "column-reverse",
  },
  left: {
    flexDirection: "row",
  },
  right: {
    flexDirection: "row-reverse",
  },
});
