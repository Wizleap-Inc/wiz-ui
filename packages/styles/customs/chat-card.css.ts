import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const chatCardOpenButtonStyle = style({
  position: "absolute",
  top: 0,
  left: 0,
  padding: 0,
  width: "100%",
  height: `calc(${THEME.fontSize.xl2} + ${THEME.spacing.md} * 2)`,
  boxSizing: "border-box",
  border: "none",
  cursor: "pointer",
  background: "transparent",
});
