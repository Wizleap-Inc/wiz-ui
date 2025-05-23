import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const hiddenStyle = style({
  display: "none",
});

export const containerStyle = style({
  position: "fixed",
  top: "0px",
  left: "0px",
  bottom: "0px",
  width: "100%",
  overflowY: "auto",
  backgroundColor: THEME.color.white[800],
});

export const headerStyle = style({
  padding: "8px 16px",
  margin: 0,
  borderTop: `${THEME.borderWidth.sm} solid ${THEME.color.green[800]}`,
});

export const contentStyle = style({
  padding: "24px 16px",
});
