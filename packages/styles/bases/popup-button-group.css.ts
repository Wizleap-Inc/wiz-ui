import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const selectBoxStyle = style({
  position: "relative",
  height: THEME.spacing.xl3,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const popupButtonGroupStyle = style({
  paddingRight: THEME.spacing.xs,
  paddingLeft: THEME.spacing.sm,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  maxHeight: "25rem",
  // overflowY: "auto",
});

export const popupButtonGroupOptionStyle = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["700"],
  boxSizing: "border-box",
  cursor: "pointer",
  ":hover": {
    color: THEME.color.green["800"],
    background: THEME.color.green["300"],
  },
  ":active": {
    color: THEME.color.white["800"],
    background: THEME.color.green["800"],
  },
});

export const popupButtonGroupTitleStyle = style({
  width: "100%",
  display: "flex",
  fontWeight: THEME.fontWeight.bold,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  color: THEME.color.gray["700"],

  justifyContent: "space-between",
  alignItems: "center",
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
  boxSizing: "border-box",
  cursor: "pointer",
});

export const popupButtonGroupDividerStyle = style({
  height: "1px",
  border: "none",
  margin: "0 0",
  backgroundColor: THEME.color.gray[300],
});
