import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const timePickerStyle = style({
  width: "max-content",
  padding: `0 ${THEME.spacing.xs2}`,
  height: THEME.spacing.xl3,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const timePickerDisabledStyle = style({
  color: THEME.color.gray["700"],
  backgroundColor: THEME.color.gray["300"],
});

export const timePickerCursorStyle = styleVariants({
  default: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});

export const timePickerBoxStyle = style({
  height: "100%",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
});

export const timePickerBoxColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["500"],
  },
  selected: {
    color: THEME.color.gray["700"],
  },
});

export const timePickerSelectorStyle = style({
  position: "absolute",
  top: `calc(100% + 1px * 2)`,
  left: 0,
  width: "auto",
  padding: THEME.spacing.xs,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const timePickerScrollStyle = style({
  margin: `${THEME.spacing.xs2} 0`,
  scrollbarWidth: "thin",
  scrollbarColor: `${THEME.color.gray["400"]} transparent`,
  selectors: {
    "&::-webkit-scrollbar": {
      width: THEME.spacing.xs2,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: THEME.color.gray["400"],
      borderRadius: THEME.spacing.xs2,
    },
  },
});

export const timePickerSelectorOptionStyle = style({
  width: "2em",
  position: "relative",
  margin: `0 ${THEME.spacing.xs}`,
  padding: THEME.spacing.xs2,
  fontSize: THEME.fontSize.xs2,
  textAlign: "center",
  boxSizing: "border-box",
  borderRadius: THEME.spacing.xs2,
});

export const timePickerSelectorOptionTypeStyle = style({
  color: THEME.color.gray["600"],
});

export const timePickerSelectorOptionItemStyle = style({
  ":hover": {
    color: THEME.color.green["800"],
    background: THEME.color.green["300"],
    borderRadius: THEME.spacing.xs2,
  },
  ":active": {
    color: THEME.color.white["800"],
    background: THEME.color.green["800"],
  },
});

export const timePickerSelectorOptionItemSelectedStyle = style({
  background: THEME.color.green["800"],
});

export const timePickerSelectorOptionItemColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["700"],
  },
  selected: {
    color: THEME.color.white["800"],
  },
});
