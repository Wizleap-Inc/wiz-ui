import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const dropdownStyle = style({
  background: THEME.color.white[800],
  borderRadius: THEME.spacing.xs2,
  minWidth: "10rem",
});

export const dropdownSkeletonStyle = style({
  background: THEME.color.white[500],
});

export const dropdownItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
  cursor: "pointer",
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  userSelect: "none",
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        background: THEME.color.green[300],
        color: THEME.color.green[800],
      },
    },
  },
  ":active": {
    background: THEME.color.green[800],
    color: THEME.color.white[800],
  },
});
