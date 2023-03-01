import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const popupStyle = style({
  position: "absolute",
  filter: `drop-shadow(${THEME.shadow.sm})`,
  width: "max-content",
});

export const popupContainerStyle = styleVariants({
  default: {
    width: "fit-content",
    height: "fit-content",
  },
  expanded: {
    width: "100%",
  },
});
