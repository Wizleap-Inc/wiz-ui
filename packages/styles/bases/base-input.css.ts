import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const baseInputStyle = style({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: THEME.color.gray[400],
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.5,
  color: THEME.color.gray[700],
  boxSizing: "border-box",

  "::placeholder": {
    color: THEME.color.gray[500],
  },
  ":focus": {
    outline: "none",
    borderColor: THEME.color.green[800],
  },
});

export const baseInputDisabledStyle = style({
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});
