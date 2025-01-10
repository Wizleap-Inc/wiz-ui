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
  flexGrow: 1,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.lg,
  padding: `${THEME.spacing.sm} ${THEME.spacing.xs}`,
  color: THEME.color.gray["800"],
  "::placeholder": {
    color: THEME.color.gray["500"],
    userSelect: "none",
  },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.gray[300],
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
  height: "100%",
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
    opacity: 0.5,
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.gray[300],
  },
});

export const arrowIcon = style([
  fontSizeStyle.xs,
  {
    transform: "scale(2)",
    pointerEvents: "none",
    color: "currentcolor",
  },
]);
