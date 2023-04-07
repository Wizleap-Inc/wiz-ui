import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const navigationContainerStyle = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: THEME.color.white[500],
  flexShrink: 0,
  height: "100%",
  transition: "width 0.2s ease-in-out",
  overflow: "hidden",
  zIndex: THEME.zIndex.floating,
});

export const navigationContainerItemsStyle = style({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
});

export const navigationContainerFooterStyle = style({
  padding: THEME.spacing.xl2,
});

export const navigationItemStyle = style({
  display: "flex",
  alignItems: "center",
  gap: THEME.spacing.sm,
  padding: `${THEME.spacing.xs} ${THEME.spacing.sm} ${THEME.spacing.xs} ${THEME.spacing.xl}`,
  borderRadius: THEME.spacing.xs2,
  color: THEME.color.gray["700"],
  textDecoration: "none",
  position: "relative",
  fontSize: THEME.fontSize.xs,
  lineHeight: THEME.fontSize.xl2,
  transition: "background-color 0.2s ease-in-out",
  ":before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: THEME.spacing.xs2,
    height: "100%",
    backgroundColor: THEME.color.transparent,
    borderRadius: THEME.spacing.xs2,
    transition: "background-color 0.2s ease-in-out",
  },
  selectors: {
    "&:hover::before": {
      "@media": {
        "(any-hover: hover)": {
          backgroundColor: THEME.color.green["800"],
        },
      },
    },
  },
});

export const navigationItemActiveStyle = style({
  color: THEME.color.green["800"],
  backgroundColor: THEME.color.white["800"],
  selectors: {
    "&::before": {
      backgroundColor: THEME.color.green["800"],
    },
  },
});

export const navigationItemDisabledStyle = style({
  color: THEME.color.gray["500"],
  cursor: "not-allowed",
  selectors: {
    "&:hover::before": {
      "@media": {
        "(any-hover: hover)": {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

export const navigationItemIconStyle = style({
  fontSize: THEME.fontSize.xl2,
  fill: THEME.color.gray["700"],
  flexShrink: 0,
});

export const navigationItemIconActiveStyle = style({
  fill: THEME.color.green["800"],
});

export const navigationItemIconDisabledStyle = style({
  fill: THEME.color.gray["500"],
});

export const navigationItemTextStyle = style({
  fontSize: THEME.fontSize.xs,
  minWidth: 0,
  whiteSpace: "nowrap",
});

export const navigationItemTextActiveStyle = style({
  fontWeight: "bold",
});

export const navigationPopupContainerStyle = style({
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  maxHeight: "25rem",
  overflowY: "auto",
});
