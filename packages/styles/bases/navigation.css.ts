import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const navigationContainerStyle = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: THEME.color.white[500],
  flexShrink: 0,
  height: "100%",
  transition: "width 0.2s ease-in-out",
  overflow: "hidden",
});

export const navigationContainerItemsStyle = style({
  display: "flex",
  flexDirection: "column",
});

export const navigationContainerFooterStyle = style({
  padding: THEME.spacing.xl2,
});
