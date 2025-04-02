import { globalStyle, style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = THEME.borderWidth.xs;

export const searchStyle = style({
  position: "relative",
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

const BORDER_WIDTH = THEME.borderWidth.xs;

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
  opacity: 0.5,
  color: THEME.color.gray[700],
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});

export const searchInputIconStyle = style({
  left: THEME.spacing.xs,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: THEME.fontSize.xl2,
  lineHeight: THEME.fontSize.xl2,
  width: THEME.fontSize.xl2,
  height: THEME.fontSize.xl2,
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
  // FIXME: デザインシステムを使った値で再定義する
  padding: `0.375rem ${THEME.spacing.no}`,
  width: "100%",
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
  padding: `${THEME.spacing.sm} ${THEME.spacing.xs2}`,
});

export const searchDropdownSingleSelectItemMarginStyle = style({
  padding: `${THEME.spacing.sm} 0`,
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

export const searchDropdownSingleSelectItemStyle = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  fontSize: THEME.fontSize.sm,
  userSelect: "none",
  border: "none",
  backgroundColor: THEME.color.transparent,
  color: THEME.color.gray[800],
  textAlign: "left",
  padding: `0.375rem  ${THEME.spacing.xs}`,
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        background: THEME.color.green[300],
        color: THEME.color.green[800],
      },
    },
  },
});

export const searchInputInnerBoxStyle = style({
  height: "100%",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
  width: "100%",
  boxSizing: "border-box",
  display: "inline-block",
});

export const searchInputSelectedItemStyle = style({
  height: "100%",
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
  // width: "100%",
  boxSizing: "border-box",
  display: "inline-block",
});

export const searchInputInnerBoxSelectedItemStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  display: "flex",
  flexDirection: "row",
  float: "left",
  alignItems: "center",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  gap: THEME.spacing.xs,

  background: THEME.color.gray["300"],
  border: `${THEME.borderWidth.xs} solid ${THEME.color.gray["400"]}`,
  borderRadius: THEME.spacing.xs2,

  color: THEME.color.gray["800"],
});

export const searchInputInnerBoxSelectedLabelStyle = style({
  lineHeight: THEME.fontSize.lg,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  userSelect: "none",
});

export const searchInputInnerBoxCloseStyle = style({
  fill: THEME.color.gray["500"],
  fontSize: THEME.spacing.xs,
});

export const searchInputInnerBoxCloseButtonStyle = style({
  border: "none",
  background: "none",
  padding: 0,
  cursor: "pointer",
  ":disabled": {
    cursor: "not-allowed",
  },
});

export const searchInputInnerInputStyle = style({
  minWidth: "30%",
  border: "none",
  outline: "none",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.no}`,
  lineHeight: THEME.fontSize.xl,
  flexGrow: 1,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["800"],
  "::placeholder": {
    color: THEME.color.gray["500"],
    userSelect: "none",
  },
  ":disabled": {
    cursor: "not-allowed",
    backgroundColor: THEME.color.gray["300"],
  },
  selectors: {
    "&:disabled::placeholder": {
      color: THEME.color.gray[700],
    },
  },
});
