import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const drawerStyle = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  zIndex: THEME.zIndex.floating,
  background: THEME.color.white[800],
});

export const drawerShadowStyle = style({
  boxShadow: `-8px 0px 40px 0px rgba(0, 0, 0, 0.20)`,
});
