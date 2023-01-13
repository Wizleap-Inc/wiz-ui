import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const paginationStyle = style({
  width: "fit-content",
  background: THEME.color.white[500],
  borderRadius: THEME.spacing.max,
  padding: THEME.spacing.sm,
});

export const paginationButtonStyle = style({
  fontSize: THEME.fontSize.sm,
  height: THEME.spacing.xl3,
  width: THEME.spacing.xl3,
  borderRadius: THEME.spacing.max,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const paginationButtonVariantStyle = styleVariants({
  default: {
    background: THEME.color.white[500],
    color: THEME.color.gray[700],
    ":hover": {
      background: THEME.color.green[300],
      color: THEME.color.green[800],
    },
    ":active": {
      background: THEME.color.green[800],
      color: THEME.color.white[800],
      fill: THEME.color.white[800],
    },
  },
  active: {
    background: THEME.color.green[800],
    color: THEME.color.white[800],
  },
});

export const paginationIconStyle = style({
  fontSize: THEME.fontSize.xl2,
});
