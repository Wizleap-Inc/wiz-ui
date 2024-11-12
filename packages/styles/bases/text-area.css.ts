import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const textAreaStyle = style({
  resize: "none",
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.5,
  color: THEME.color.gray[700],
  "::placeholder": {
    color: THEME.color.gray[500],
  },
  ":disabled": {
    opacity: 0.5,
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.gray[300],
    cursor: "not-allowed",
  },
  selectors: {
    "&:disabled::placeholder": {
      color: THEME.color.gray[700],
    },
  },
});

export const textAreaExpandStyle = style({
  width: "100%",
});
