import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tinyButtonBaseStyle = style({
  borderRadius: THEME.spacing.xs2,
  width: "fit-content",
  color: THEME.color.white[800],
  border: "none",
});

export const tinyButtonVaraiantStyle = styleVariants({
  "clickable+active": {
    cursor: "pointer",
    boxShadow: THEME.shadow.md,
    background: THEME.color.gradient,
  },
  "clickable+inactive": {
    cursor: "pointer",
    boxShadow: THEME.shadow.md,
    background: THEME.color.gray[600],
  },
  "unclickable+active": {
    cursor: "not-allowed",
    boxShadow: THEME.shadow.md,
    background: THEME.color.gradient,
    opacity: 0.5,
  },
  "unclickable+inactive": {
    cursor: "not-allowed",
    boxShadow: THEME.shadow.none,
    background: THEME.color.gray[400],
  },
});

export const tinyButtonSizeStyle = style({
  padding: `${THEME.spacing["xs2"]} ${THEME.spacing["sm"]}`,
  fontWeight: "bold",
  fontSize: THEME.fontSize.xs,
});
