import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const textAreaStyle = style({
  resize: "none",
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.5,

  "::placeholder": {
    color: THEME.color.gray[500],
  },

  ":focus": {
    outline: "none",
  },
});

export const textAreaVariantStyle = styleVariants({
  default: {
    color: THEME.color.gray[700],
  },
  disabled: {
    backgroundColor: THEME.color.gray[300],
    color: THEME.color.gray[500],
    cursor: "not-allowed",
  },
});

export const textAreaExpandStyle = style({
  width: "100%",
});
