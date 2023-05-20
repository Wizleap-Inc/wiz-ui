import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const showMoreLessDetailsStyle = style({
  borderRadius: THEME.spacing.xs,
});

export const showMoreLessMessageStyle = style({
  fontWeight: THEME.fontWeight.normal,
  fontSize: THEME.fontSize.sm,
  lineHeight: "130%",
  alignItems: "center",
});

export const showMoreLessSummaryStyle = style({
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const showMoreDefaultHoverBgColorStyle = style({
  backgroundColor: THEME.color.gray["200"],
});

export const showMoreLessDefaultHoverStyle = style({
  color: THEME.color.green["800"],
});

export const showMoreLessContentStyle = style({
  overflow: "hidden",
  maxHeight: 0,
  transition: "max-height 0.4s ease-in-out",
});

export const showMoreLessExpandIconStyle = style({
  transition: "0.4s",
});

export const showMoreLessRotateIconStyle = style({
  transform: "rotate(180deg)",
});
