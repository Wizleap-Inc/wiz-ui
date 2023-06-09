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
  border: "none",
  font: "inherit",
  color: "inherit",
  background: "none",
  width: "100%",
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
  cursor: "pointer",
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  userSelect: "none",
  ":disabled": {
    color: THEME.color.gray[400],
    cursor: "not-allowed",
  },
  selectors: {
    "&:active:not(:disabled)": {
      color: THEME.color.white[800],
      background: THEME.color.green[800],
    },
    "&:hover:not(:disabled):not(:active)": {
      "@media": {
        "(any-hover: hover)": {
          background: THEME.color.green[300],
          color: THEME.color.green[800],
        },
      },
    },
  },
});
