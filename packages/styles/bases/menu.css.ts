import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const menuItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  lineHeight: THEME.fontSize.xl3,
});

export const menuItemTagStyle = style({
  lineHeight: THEME.fontSize.md,
});

export const menuItemExpand = style({
  boxSizing: "border-box",
  width: "100% !important",
});

export const menuItemVariantStyle = styleVariants({
  default: {
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.white[800],
    cursor: "pointer",
  },
  hover: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.gray[200],
    cursor: "pointer",
  },
  active: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.green[300],
    fontWeight: 700,
    cursor: "pointer",
  },
  disabled: {
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.white[800],
    opacity: 0.5,
    cursor: "not-allowed",
  },
  selected: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.white[800],
    fontWeight: 700,
  },
});

export const menuItemTransparentVariantStyle = styleVariants({
  default: {
    backgroundColor: THEME.color.transparent,
  },
  hover: {
    backgroundColor: THEME.color.transparent,
  },
  active: {
    backgroundColor: THEME.color.white[800],
  },
  disabled: {
    backgroundColor: THEME.color.transparent,
  },
  selected: {
    backgroundColor: THEME.color.white[800],
  },
});
