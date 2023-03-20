import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const accordionDetailsStyle = style({
  borderRadius: THEME.spacing.xs,
});

export const accordionMessageStyle = style({
  fontWeight: THEME.fontWeight.normal,
  fontSize: THEME.fontSize.sm,
  lineHeight: "130%",
  alignItems: "center",
});

export const accordionSummaryStyle = style({
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const accordionContentStyle = style({
  overflow: "hidden",
  maxHeight: 0,
  transition: "max-height 0.4s ease-in-out",
});

export const accordionExpandIconStyle = style({
  transition: "0.4s",
});

export const accordionRotateIconStyle = style({
  transform: "rotate(180deg)",
});
