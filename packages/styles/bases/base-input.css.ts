import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const baseInputStyle = style({
  borderRadius: THEME.spacing.xs2,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.86,
  color: THEME.color.gray[700],
  boxSizing: "border-box",

  "::placeholder": {
    color: THEME.color.gray[500],
    fontSize: `calc((${THEME.fontSize.sm} + ${THEME.fontSize.xs}) / 2)`,
  },
  ":focus": {
    outline: "none",
  },
});

export const baseInputPaddingStyle = styleVariants({
  left: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
    paddingLeft: THEME.spacing.xl3,
  },
  right: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
    paddingRight: THEME.spacing.xl3,
  },
  both: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  },
  none: {
    padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  },
});

export const baseInputDisabledStyle = style({
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});
