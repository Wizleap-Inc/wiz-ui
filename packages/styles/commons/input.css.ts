import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const baseInputBorderStyle = style({
  borderWidth: "1px",
  borderStyle: "solid",
});

export const inputBorderStyle = styleVariants({
  default: [baseInputBorderStyle, { borderColor: THEME.color.gray[400] }],
  active: [baseInputBorderStyle, { borderColor: THEME.color.green[800] }],
  error: [baseInputBorderStyle, { borderColor: THEME.color.red[400] }],
});
