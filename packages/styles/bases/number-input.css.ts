import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

import { fontSizeStyle } from "../commons";

export const container = style({
  position: "relative",
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  overflow: "hidden",
});

export const disabled = style({
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});

export const input = style({
  "::-webkit-outer-spin-button": {
    appearance: "none",
    margin: 0,
  },
  "::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
  MozAppearance: "textfield",
  textAlign: "right",
  minWidth: "30%",
  border: "none",
  outline: "none",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
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
    color: THEME.color.gray["500"],
  },
});

export const button = style({
  lineHeight: 0.2,
  position: "relative",
  cursor: "pointer",
  padding: THEME.spacing.xs2,
  borderRadius: THEME.spacing.no,
  boxSizing: "border-box",
  borderColor: THEME.color.gray["400"],
  border: "none",
  borderLeft: `1px solid ${THEME.color.gray["400"]}`,
  background: "transparent",
  fill: THEME.color.gray["500"],
  selectors: {
    "&:hover:not(:disabled)": {
      "@media": {
        "(any-hover: hover)": {
          backgroundColor: THEME.color.green["300"],
          fill: THEME.color.green["800"],
        },
      },
    },
    "&:active:not(:disabled)": {
      backgroundColor: THEME.color.green["800"],
      fill: THEME.color.white["800"],
    },
  },
  ":disabled": {
    cursor: "not-allowed",
  },
});

export const arrowIcon = style([
  fontSizeStyle.xs2,
  {
    transform: "scale(2)",
    pointerEvents: "none",
    color: "currentcolor",
  },
]);
