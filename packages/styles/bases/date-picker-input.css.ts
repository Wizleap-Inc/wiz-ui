import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const datePickerStyle = style({
  width: "max-content",
  height: THEME.spacing.xl3,
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
});

export const datePickerVariantStyle = styleVariants({
  default: {
    color: THEME.color.gray["500"],
    background: THEME.color.white["800"],
    cursor: "pointer",
  },
  selected: {
    color: THEME.color.gray["700"],
    background: THEME.color.white["800"],
    cursor: "pointer",
  },
  disabled: {
    color: THEME.color.gray["700"],
    background: THEME.color.gray["300"],
    cursor: "not-allowed",
  },
});

export const datePickerSelectorStyle = style({
  position: "absolute",
  top: "calc(100% + 2px)",
  left: "0",
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

  ":hover": {
    backgroundColor: THEME.color.green["300"],
    fill: THEME.color.green["800"],
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    fill: THEME.color.white["800"],
  },
});
