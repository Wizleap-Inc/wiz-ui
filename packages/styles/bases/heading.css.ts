import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const baseHeadingStyle = style({
  fontWeight: "bold",
  lineHeight: 1.2,
  margin: 0,
  color: THEME.color.gray[700],
});

export const headingStyle = styleVariants({
  1: [
    baseHeadingStyle,
    { fontSize: THEME.fontSize.xl2, color: THEME.color.gray[900] },
  ],
  2: [
    baseHeadingStyle,
    { fontSize: THEME.fontSize.xl, color: THEME.color.gray[800] },
  ],
  3: [baseHeadingStyle, { fontSize: THEME.fontSize.md }],
  4: [baseHeadingStyle, { fontSize: THEME.fontSize.sm }],
  5: [baseHeadingStyle, { fontSize: THEME.fontSize.xs }],
  6: [baseHeadingStyle, { fontSize: THEME.fontSize.xs2 }],
});
