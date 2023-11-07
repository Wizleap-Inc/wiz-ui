import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const popupStyle = style({
  position: "absolute",
  width: "max-content",
});

export const popupShadowStyle = style({
  filter: `drop-shadow(${THEME.shadow.sm})`,
});

export const popupContainerStyle = style({
  height: "fit-content",
});

export const popupHiddenStyle = style({
  display: "none",
});

export const popupFixedStyle = style({
  position: "fixed",
});
