import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const baseTextButtonStyle = style({
  fontWeight: "bold",
  padding: `${THEME.spacing["xs"]} ${THEME.spacing["xl"]}`,
  cursor: "pointer",
  borderRadius: THEME.spacing.xs2,
  width: "fit-content",
  selectors: {
    "&:hover:not(:disabled)": {
      opacity: 0.9,
    },
  },
});

export const textButtonStyle = styleVariants({
  primary: [
    baseTextButtonStyle,
    {
      background: THEME.color.gradient,
      color: THEME.color.white[800],
      boxShadow: THEME.shadow.md,
      border: "none",
    },
  ],
  sub: [
    baseTextButtonStyle,
    {
      background: THEME.color.white[800],
      color: THEME.color.green[800],
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: THEME.color.gray[400],
    },
  ],
});

export const textButtonDisabledStyle = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

export const textButtonRoundStyle = style({
  borderRadius: THEME.spacing.max,
});

export const textButtonExpandStyle = style({
  width: "100%",
});

export const textButtonSizeStyle = styleVariants({
  sm: {
    fontSize: THEME.fontSize.xs,
  },
  md: {
    fontSize: THEME.fontSize.sm,
  },
  lg: {
    fontSize: THEME.fontSize.md,
  },
});
