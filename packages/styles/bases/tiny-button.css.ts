import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const tinyButtonBaseStyle = style({
  cursor: "pointer",
  borderRadius: THEME.spacing.xs2,
  width: "fit-content",
  background: THEME.color.gradient,
  color: THEME.color.white[800],
  boxShadow: THEME.shadow.md,
  border: "none",
  selectors: {
    "&:hover:not(:disabled)": {
      opacity: 0.9,
    },
  },
});

export const tinyButtonSelectableStyle = styleVariants({
  active: [tinyButtonBaseStyle],
  inactive: [
    tinyButtonBaseStyle,
    {
      background: THEME.color.gray[600],
    },
  ],
});

export const tinyButtonNotSelectableStyle = styleVariants({
  active: [
    tinyButtonBaseStyle,
    {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  ],
  inactive: [
    tinyButtonBaseStyle,
    {
      background: THEME.color.gray[400],
      boxShadow: THEME.shadow.none,
      cursor: "not-allowed",
    },
  ],
});

export const tinyButtonSizeStyle = style({
  padding: `${THEME.spacing["xs"]} ${THEME.spacing["xl"]}`,
  fontWeight: "bold",
  fontSize: THEME.fontSize.xs,
});

export const tinyButtonRoundStyle = style({
  borderRadius: THEME.spacing.max,
});
