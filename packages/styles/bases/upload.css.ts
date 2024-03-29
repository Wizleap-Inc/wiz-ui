import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";

export const uploadStyle = style({
  color: THEME.color.gray[600],
  fontSize: THEME.fontSize.sm,
  background: THEME.color.white[800],
  borderWidth: BORDER_WIDTH,
  borderStyle: "dashed",
  borderColor: THEME.color.gray[400],
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xl2} 0`,
  width: "100%",
  textAlign: "center",
  cursor: "pointer",
});

export const uploadEnterStyle = style({
  color: THEME.color.green[800],
  background: THEME.color.green[300],
});

export const uploadInputStyle = style({
  display: "none",
});
