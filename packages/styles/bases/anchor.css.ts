import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const anchorStyle = style([
  style({
    lineHeight: 1.5,
    margin: 0,
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    wordBreak: "break-word",

    ":hover": {
      textDecoration: "underline",
    },
  }),
]);

export const anchorNoWrapStyle = style({
  whiteSpace: "nowrap",
});

export const anchorIconStyle = style({
  verticalAlign: "middle",
  fontSize: THEME.fontSize.xl2,
});
