import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tooltipStyle = style({
  position: "relative",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[800],
});

export const tooltipPopupStyle = style({
  position: "absolute",
  transition: "opacity 0.2s",
  display: "flex",
  gap: `calc(${THEME.spacing.xs} * -1)`,
  alignItems: "center",
  justifyContent: "stretch",
  width: "max-content",
});

export const tooltipContentStyle = style({
  backgroundColor: THEME.color.gray[800],
  borderRadius: THEME.spacing.xs,
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

const POPUP_GAP = THEME.spacing.xs;

export const tooltipPositionStyle = styleVariants({
  top: {
    bottom: `calc(100% + ${POPUP_GAP})`,
    left: "50%",
    transform: "translateX(-50%)",
    flexDirection: "column",
  },
  bottom: {
    top: `calc(100% + ${POPUP_GAP})`,
    left: "50%",
    transform: "translateX(-50%)",
    flexDirection: "column-reverse",
  },
  left: {
    right: `calc(100% + ${POPUP_GAP})`,
    top: "50%",
    transform: "translateY(-50%)",
    flexDirection: "row",
  },
  right: {
    left: `calc(100% + ${POPUP_GAP})`,
    top: "50%",
    transform: "translateY(-50%)",
    flexDirection: "row-reverse",
  },
});
