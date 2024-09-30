import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";

export const datePickerStyle = style({
  width: "100%",
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl3,
});

export const datePickerVariantStyle = styleVariants({
  default: {
    color: THEME.color.gray["500"],
    background: THEME.color.white["800"],
    cursor: "pointer",
  },
  selected: {
    color: THEME.color.gray["800"],
    background: THEME.color.white["800"],
    cursor: "pointer",
  },
  disabled: {
    opacity: 0.5,
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.gray[300],
    cursor: "not-allowed",
  },
});

export const datePickerSelectorStyle = style({
  width: "auto",
  padding: THEME.spacing.xs,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const datePickerMonthSelectorStyle = style({
  gap: THEME.spacing.xs,
  display: "flex",
});

export const datePickerMonthSelectorItemStyle = style({
  cursor: "pointer",
  padding: THEME.spacing.xs2,
  borderRadius: THEME.spacing.xs2,
  border: "none",
  background: "transparent",
  fill: THEME.color.gray["800"],
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        backgroundColor: THEME.color.green["300"],
        fill: THEME.color.green["800"],
      },
    },
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    fill: THEME.color.white["800"],
  },
});

export const datePickerYearSelectorItemStyle = style({
  lineHeight: 0.2,
  position: "relative",
  cursor: "pointer",
  padding: THEME.spacing.no,
  borderRadius: THEME.spacing.xs2,
  border: "none",
  background: "transparent",
  fill: THEME.color.gray["800"],
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        backgroundColor: THEME.color.green["300"],
        fill: THEME.color.green["800"],
      },
    },
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    fill: THEME.color.white["800"],
  },
});

export const datePickerArrowIconStyle = style({
  transform: "scale(2)",
  pointerEvents: "none",
});

export const datePickerCancelIconStyle = style({
  cursor: "pointer",
  padding: THEME.spacing.no,
  borderRadius: THEME.spacing.xs2,
  border: "none",
  background: "transparent",
  fill: THEME.color.gray["500"],
  ":active": {
    fill: THEME.color.green["800"],
  },
  ":disabled": {
    cursor: "not-allowed",
  },
});
