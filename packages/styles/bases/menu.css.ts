import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const menuItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  lineHeight: THEME.fontSize.xl3,
});

export const menuItemVariantStyle = styleVariants({
  default: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.white[800],
    cursor: "pointer",
  },
  hover: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.gray[200],
    fontWeight: 700,
    cursor: "pointer",
  },
  active: {
    color: THEME.color.green[800],
    backgroundColor: THEME.color.green[300],
    fontWeight: 700,
    cursor: "pointer",
  },
  disabled: {
    color: THEME.color.gray[500],
    opacity: "0.5",
    cursor: "not-allowed",
  },
});

export const menuItemIconStyle = style({
  marginLeft: THEME.spacing.xs,
});
