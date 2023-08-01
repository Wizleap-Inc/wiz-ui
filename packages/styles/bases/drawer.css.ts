import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const drawerContainerStyle = style({
  position: "absolute",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: THEME.color.white[500],
  flexShrink: 0,
  height: "100%",
  transition: "width 0.2s ease-in-out",
  overflow: "hidden",
  zIndex: THEME.zIndex.floating,
});

export const drawerContainerItemsStyle = style({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
});

export const drawerContainerFooterStyle = style({
  padding: THEME.spacing.xl2,
});
