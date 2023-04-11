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

const textButtonSizeXsStyle = style({
  padding: `${THEME.spacing["xs2"]} ${THEME.spacing["sm"]}`,
  lineHeight: THEME.fontSize.lg,
});

const textButtonSizeNotXsStyle = style({
  padding: `${THEME.spacing["xs"]} ${THEME.spacing["xl"]}`,
  fontWeight: "bold",
});

export const textButtonSizeStyle = styleVariants({
  xs: [
    textButtonSizeXsStyle,
    {
      fontSize: THEME.fontSize.xs,
    },
  ],
  sm: [
    textButtonSizeNotXsStyle,
    {
      fontSize: THEME.fontSize.xs,
    },
  ],
  md: [
    textButtonSizeNotXsStyle,
    {
      fontSize: THEME.fontSize.sm,
    },
  ],
  lg: [
    textButtonSizeNotXsStyle,
    {
      fontSize: THEME.fontSize.md,
    },
  ],
});

export const textButtonStackStyle = style({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "center",
  alignItems: "center",
});
