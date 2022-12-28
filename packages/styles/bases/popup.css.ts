import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const popupDirectionStyle = styleVariants({
  tl: {
    bottom: "100%",
    left: 0,
  },
  tr: {
    bottom: "100%",
    right: 0,
  },
  bl: {
    top: "100%",
    left: 0,
  },
  br: {
    top: "100%",
    right: 0,
  },
  rt: {
    top: 0,
    left: "100%",
  },
  rb: {
    bottom: 0,
    left: "100%",
  },
  lt: {
    top: 0,
    right: "100%",
  },
  lb: {
    bottom: 0,
    right: "100%",
  },
});

export const popupStyle = style({
  position: "absolute",
  filter: `drop-shadow(${THEME.shadow.sm})`,
  width: "max-content",
});
