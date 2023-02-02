import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const searchStyle = style({
  position: "relative",
});

export const searchInputStyle = style({
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs} ${THEME.spacing.xl2} ${THEME.spacing.xs} ${THEME.spacing.xl3}`,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.5,
  color: THEME.color.gray[700],
  boxSizing: "border-box",
  ":focus": {
    outline: "none",
  },
  "::placeholder": {
    color: THEME.color.gray[500],
    fontSize: THEME.fontSize.sm,
  },
});

export const searchInputDisabledStyle = style({
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});

export const searchExpandStyle = styleVariants({
  default: {
    width: "fit-content",
  },
  expand: {
    width: "100%",
  },
});

export const searchInputIconStyle = style({
  position: "absolute",
  top: THEME.spacing.xs,
  left: THEME.spacing.xs,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: THEME.fontSize.xl2,
  lineHeight: THEME.fontSize.xl2,
  width: THEME.fontSize.xl2,
  height: THEME.fontSize.xl2,
  fill: THEME.color.gray["400"],
});

export const searchDividerStyle = style({
  paddingTop: THEME.spacing.xs,
  // paddingBottom: THEME.spacing.xs,
});

export const searchPopupStyle = style({
  display: "flex",
});

export const searchPopupBlockStyle = style({
  // display: "flex",
  // alignItems: "flex-start",
  height: "fit-content",
  backgroundColor: THEME.color.white[800],
  // borderRadius: THEME.spacing.xs2,
  // paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
  paddingRight: THEME.spacing.xs,
  paddingLeft: THEME.spacing.xs,
});

export const searchPopupItemStyle = style({
  paddingTop: THEME.spacing.xs,
});

export const searchPopupItemExpandStyle = styleVariants({
  default: {
    width: "10rem",
  },
  expand: {
    width: "100%",
  },
});

export const searchDropItemStyle = style({
  paddingLeft: THEME.spacing.xs,
  cursor: "pointer",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[700],
  lineHeight: THEME.fontSize.xl,
  userSelect: "none",
  ":hover": {
    background: THEME.color.green[300],
    color: THEME.color.green[800],
  },
});
