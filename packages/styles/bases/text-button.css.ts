import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const baseTextButtonStyle = style({
  cursor: "pointer",
  borderRadius: THEME.spacing.xs2,
  width: "fit-content",
  selectors: {
    "&:hover:not(:disabled)": {
      "@media": {
        "(any-hover: hover)": {
          opacity: 0.9,
        },
      },
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
      boxShadow: THEME.shadow.md,
      border: "none",
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
  xs: [
    {
      padding: `${THEME.spacing["xs2"]} ${THEME.spacing["sm"]}`,
      fontWeight: THEME.fontWeight.bold,
      lineHeight: THEME.fontSize.lg,
      fontSize: THEME.fontSize.xs2,
    },
  ],
  sm: [
    {
      padding: `${THEME.spacing["xs"]} ${THEME.spacing["xl"]}`,
      fontWeight: THEME.fontWeight.bold,
      fontSize: THEME.fontSize.xs,
      lineHeight: THEME.fontSize.xl,
    },
  ],
  md: [
    {
      padding: `${THEME.fontSize["xs2"]} ${THEME.spacing["xl"]}`,
      fontWeight: THEME.fontWeight.bold,
      fontSize: THEME.fontSize.sm,
      lineHeight: THEME.fontSize.xl2,
    },
  ],
  lg: [
    {
      padding: `${THEME.fontSize["xs2"]} ${THEME.spacing["xl"]}`,
      fontWeight: THEME.fontWeight.bold,
      fontSize: THEME.fontSize.md,
      lineHeight: THEME.fontSize.xl3,
    },
  ],
});
