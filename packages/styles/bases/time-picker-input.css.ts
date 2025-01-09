import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";

export const timePickerStyle = style({
  width: "100%",
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  height: "100%",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl3,
});

export const timePickerDisabledStyle = style({
  opacity: 0.5,
  color: THEME.color.gray[700],
  backgroundColor: THEME.color.gray[300],
});

export const timePickerCursorStyle = styleVariants({
  default: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});

export const timePickerBoxColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["500"],
  },
  selected: {
    color: THEME.color.gray["800"],
  },
  disabled: {
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
  overflow: "auto",
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
  fontSize: THEME.fontSize.xs,
  textAlign: "center",
  boxSizing: "border-box",
  borderRadius: THEME.spacing.xs2,
});

export const timePickerSelectorOptionTitleStyle = style({
  margin: `0 ${THEME.spacing.sm} 0 ${THEME.spacing.xs}`,
});

export const timePickerSelectorOptionTypeStyle = style({
  color: THEME.color.gray["600"],
});

export const timePickerSelectorOptionItemStyle = style({
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        color: THEME.color.green["800"],
        background: THEME.color.green["300"],
        borderRadius: THEME.spacing.xs2,
      },
    },
  },
});

export const timePickerSelectorOptionItemSelectedStyle = style({
  background: THEME.color.green["800"],
});

export const timePickerSelectorOptionItemColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["800"],
  },
  selected: {
    color: THEME.color.white["800"],
  },
});

export const cancelButtonStyle = style({
  cursor: "pointer",
  background: "transparent",
  border: "none",
  padding: 0,
  fill: THEME.color.gray["500"],
  ":active": {
    fill: THEME.color.green["800"],
  },
  ":disabled": {
    cursor: "not-allowed",
  },
});
