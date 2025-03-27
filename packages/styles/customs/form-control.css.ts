import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

/**
 * borderColorStyleと併用する前提のためborderColorは含まない
 */
export const borderLeftStyle = style({
  borderLeftWidth: "3px",
  borderLeftStyle: "solid",
  paddingLeft: THEME.spacing.xs,
});

export const borderLeftTextStyle = style({
  lineHeight: "140%",
});
