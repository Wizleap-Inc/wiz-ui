import { globalStyle, style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";

export const searchStyle = style({
  position: "relative",
});

const BORDER_WIDTH = "1px";

export const searchInputStyle = style({
  borderRadius: THEME.spacing.xs2,
  padding: `calc(${THEME.spacing.sm} - ${BORDER_WIDTH}) ${THEME.spacing.xl2} calc(${THEME.spacing.sm} - ${BORDER_WIDTH}) ${THEME.spacing.xl3}`,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.spacing.lg,
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

export const searchInputIconStyle = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
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

export const searchContainerStyle = style({
  position: "absolute",
});

export const searchPopupStyle = style({
  display: "flex",
});

export const searchBlockStyle = style({
  backgroundColor: THEME.color.white[800],
  paddingRight: THEME.spacing.xs,
  paddingLeft: THEME.spacing.xs,
  height: "25rem",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: THEME.spacing.xs2,
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: THEME.color.gray[400],
    borderRadius: THEME.spacing.xs,
  },
});

export const searchBlockBorderStyle = style({
  borderRight: `${borderWidth} solid ${THEME.color.gray["400"]}`,
});

export const searchBlockBorderRadiusStyle = style({
  borderRadius: `${THEME.spacing.xs2} ${THEME.spacing.no} ${THEME.spacing.no} ${THEME.spacing.xs2}`,
});

export const searchPopupBlockStyle = style({
  backgroundColor: THEME.color.white[800],
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  height: "25rem",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: THEME.spacing.xs2,
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: THEME.color.gray[400],
    borderRadius: THEME.spacing.xs,
  },
});

export const searchPopupBlockBorderRightStyle = style({
  borderRight: `${borderWidth} solid ${THEME.color.gray["400"]}`,
});

export const searchPopupBlockBorderRadiusStyle = style({
  borderRadius: `${THEME.spacing.no} ${THEME.spacing.xs2} ${THEME.spacing.xs2} ${THEME.spacing.no}`,
});

export const searchDropdownItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.no}`,
});

export const searchPopupDropdownItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.no}`,
});

export const searchDropdownLabelStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: THEME.spacing.xs,
  cursor: "pointer",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[800],
  userSelect: "none",
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        background: THEME.color.green[300],
        color: THEME.color.green[800],
      },
    },
  },
});

export const searchDropdownEmptyMessageStyle = style({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[600],
  lineHeight: THEME.fontSize.xl3,
  userSelect: "none",
});

export const searchDropdownSelectingItemStyle = style({
  background: THEME.color.green[300],
  color: THEME.color.green[800],
});

export const searchDropdownCheckboxItemStyle = style({
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
});

export const searchCheckboxInputStyle = style({
  display: "none",
});

export const searchCheckboxLabelStyle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  color: THEME.color.gray["800"],
  lineHeight: THEME.fontSize.xl3,
  fontSize: THEME.fontSize.sm,
  gap: THEME.spacing.sm,
  cursor: "pointer",
  ":before": {
    content: "",
    border: `${borderWidth} solid ${THEME.color.gray["400"]}`,
    borderRadius: `calc(${THEME.spacing.xs2} / 2)`,
    width: THEME.spacing.md,
    height: THEME.spacing.md,
    boxSizing: "border-box",
    display: "inline-block",
    flexShrink: 0,
  },
});

export const searchCheckboxLabelCheckedStyle = style({
  ":before": {
    border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  },
});

export const searchCheckboxIconStyle = style({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: borderWidth,
  fill: THEME.color.green["800"],
});

export const searchCheckboxBlockCheckedStyle = style({
  color: THEME.color.green["800"],
});

export const searchInputLabelStyle = style({
  width: "100%",
});

export const searchInputCheckboxStyle = style({});
// FIXME: WizCheckBoxNewで置換する際に消す。
globalStyle(`${searchInputCheckboxStyle} > div`, {
  width: "100%",
});
