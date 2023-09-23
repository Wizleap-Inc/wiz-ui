import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const drawerContainerStyle = style({
  position: "fixed",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexShrink: 0,
  height: "100%",
  transition: "width 0.2s ease-in-out",
  overflow: "hidden",
  zIndex: THEME.zIndex.floating,
});

export const drawerContainerItemsStyle = style({
  background: THEME.color.white[800],
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  height: "100%",
  position: "fixed",
});

export const drawerShadowStyle = style({
  boxShadow: `-8px 0px 40px 0px rgba(0, 0, 0, 0.20)`,
});
