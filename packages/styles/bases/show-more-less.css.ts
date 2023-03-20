import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const accordionDetailsStyle = styleVariants({
  white: {
    borderRadius: THEME.spacing.xs,
    backgroundColor: THEME.color.white[800],
  },
  gray: {
    borderRadius: THEME.spacing.xs,
    backgroundColor: THEME.color.gray[300],
  },
});

export const accordionMessageVariantStyle = styleVariants({
  white: {
    color: THEME.color.gray[600],
    fontWeight: THEME.fontWeight.normal,
    fontSize: THEME.fontSize.sm,
    lineHeight: "130%",
    alignItems: "center",
  },
  gray: {
    color: THEME.color.green[800],
    fontWeight: THEME.fontWeight.normal,
    fontSize: THEME.fontSize.sm,
    lineHeight: "130%",
    alignItems: "center",
  },
});

export const accordionSummaryStyle = style({
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const accordionContentStyle = style({
  overflow: "hidden",
});

export const accordionExpandIconStyle = style({
  transition: "0.4s",
});

export const accordionRotateIconStyle = style({
  transform: "rotate(180deg)",
});

export const showMoreLessExpandStyle = style({});
