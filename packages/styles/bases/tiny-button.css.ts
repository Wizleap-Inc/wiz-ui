import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tinyButtonStyle = style({
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

export const tinyButtonDisabledStyle = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

// TODO: Disableのパターンを追加
export const tinyButtonDisabledGrayStyle = style({
  backgroundColor: THEME.color.gray[500],
  opacity: 0.1,
  cursor: "not-allowed",
});

export const tinyButtonRoundStyle = style({
  borderRadius: THEME.spacing.max,
});

export const tinyButtonSizeStyle = style({
  padding: `${THEME.spacing["xs"]} ${THEME.spacing["xl"]}`,
  fontWeight: "bold",
  fontSize: THEME.fontSize.xs,
});
