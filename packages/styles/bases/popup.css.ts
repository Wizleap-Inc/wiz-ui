import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const popupStyle = style({
  position: "absolute",
  width: "max-content",
});

export const popupShadowStyle = style({
  filter: `drop-shadow(${THEME.shadow.sm})`,
});

export const popupContainerStyle = styleVariants({
  default: {
    width: "auto",
    height: "auto",
  },
  expanded: {
    width: "100%",
  },
});

export const popupHiddenStyle = style({
  display: "none",
});
