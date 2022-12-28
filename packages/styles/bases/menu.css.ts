import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const menuItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  color: THEME.color.gray[600],
  cursor: "pointer",
});

export const menuItemHoverStyle = style({
  color: THEME.color.green[800],
});

export const menuItemActiveStyle = style({
  color: THEME.color.green[800],
  backgroundColor: THEME.color.white[800],
  fontWeight: 700,
});

export const menuItemDisabledStyle = style({
  color: THEME.color.gray[500],
  cursor: "not-allowed",
});
