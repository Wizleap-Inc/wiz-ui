import { style } from "@vanilla-extract/css";
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

export const InputStyle = style({
  "::-webkit-outer-spin-button": {
    appearance: "none",
    margin: 0,
  },
  "::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
  MozAppearance: "textfield",
  minWidth: "30%",
  border: "none",
  outline: "none",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.no}`,
  lineHeight: THEME.fontSize.xl,
  flexGrow: 1,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["800"],
  "::placeholder": {
    color: THEME.color.gray["500"],
    userSelect: "none",
  },
  ":disabled": {
    cursor: "not-allowed",
    backgroundColor: THEME.color.gray["300"],
  },
});

export const ButtonStyle = style({
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

export const ArrowIconStyle = style({
  transform: "scale(2)",
  pointerEvents: "none",
});
