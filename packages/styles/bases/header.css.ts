import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const headerStyle = style({
  width: "100%",
  backgroundColor: THEME.color.white[500],
  height: THEME.share.HEADER_HEIGHT,
});

export const headerStickyStyle = style({
  position: "sticky",
  top: 0,
  left: 0,
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: THEME.color.gray[400],
});
