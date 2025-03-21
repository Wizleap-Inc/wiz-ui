import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const baseInputStyle = style({
  borderRadius: THEME.spacing.xs2,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.lg,
  color: THEME.color.gray[800],
  boxSizing: "border-box",

  "::placeholder": {
    color: THEME.color.gray[500],
    fontSize: `calc((${THEME.fontSize.sm} + ${THEME.fontSize.xs}) / 2)`,
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
    "&::-ms-reveal": {
      display: "none",
    },
  },
});

export const baseInputPaddingStyle = styleVariants({
  left: {
    padding: `${THEME.spacing.sm} ${THEME.spacing.xs}`,
    paddingLeft: THEME.spacing.xl3,
  },
  right: {
    padding: `${THEME.spacing.sm} ${THEME.spacing.xs}`,
    paddingRight: THEME.spacing.xl3,
  },
  both: {
    padding: `${THEME.spacing.sm} ${THEME.spacing.xs}`,
  },
  none: {
    padding: `${THEME.spacing.sm} ${THEME.spacing.xs}`,
  },
});
