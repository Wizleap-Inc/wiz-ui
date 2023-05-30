import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const BORDER_WIDTH = "1px";

const baseBodyStyle = style({
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const bodyStyle = styleVariants({
  active: [
    baseBodyStyle,
    {
      background: THEME.color.white["800"],
      cursor: "pointer",
    },
  ],
  disabled: [
    baseBodyStyle,
    {
      background: THEME.color.gray["300"],
      cursor: "not-allowed",
    },
  ],
});

export const widthStyle = styleVariants({
  default: {
    width: "10rem",
  },
  expanded: {
    width: "100%",
  },
});

export const separatorStyle = style({
  color: THEME.color.gray["500"],
});

const inputTextBaseStyle = style({
  fontSize: THEME.fontSize.sm,
  width: "100%",
  lineHeight: THEME.fontSize.xl3,
});

export const inputTextStyle = styleVariants({
  default: [
    inputTextBaseStyle,
    {
      color: THEME.color.gray["500"],
    },
  ],
  selected: [
    inputTextBaseStyle,
    {
      color: THEME.color.gray["700"],
    },
  ],
});

export const popupStyle = style({
  display: "flex",
  flexDirection: "column",
});

export const popupHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  borderBottom: `1px solid ${THEME.color.gray["300"]}`,
  padding: THEME.spacing.xs,
});

export const popupHeaderSelectBoxContainerStyle = style({
  position: "relative",
});

export const popupHeaderSelectBoxStyle = style({
  border: `1px solid ${THEME.color.gray["300"]}`,
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: THEME.color.white["800"],
  gap: THEME.spacing.xs,
  cursor: "pointer",
  color: THEME.color.gray["700"],
});

export const popupHeaderSelectBoxOptionsStyle = style({
  position: "absolute",
  top: "calc(100% + 1rem)",
  right: 0,
  zIndex: 1,
  width: "max-content",
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxShadow: THEME.shadow.sm,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: THEME.spacing.xs2,
  padding: THEME.spacing.xs2,
});

export const popupHeaderSelectBoxOptionStyle = style({
  border: "none",
  cursor: "pointer",
  background: "transparent",
  color: THEME.color.gray["700"],

  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        backgroundColor: THEME.color.green["300"],
        color: THEME.color.green["800"],
      },
    },
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    color: THEME.color.white["800"],
  },
});

export const popupCalendarsStyle = style({
  display: "flex",
});

const popupCalendarContainerBaseStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: THEME.spacing.xs2,
  padding: THEME.spacing.xs,
});

export const popupCalendarContainerStyle = styleVariants({
  left: [
    popupCalendarContainerBaseStyle,
    {
      borderRight: `1px solid ${THEME.color.gray["300"]}`,
    },
  ],
  right: [popupCalendarContainerBaseStyle],
});

export const popupCalendarHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: THEME.spacing.xl,
  width: "100%",
});

export const popupCalendarMonthStyle = style({
  fontSize: THEME.fontSize.xs,
  color: THEME.color.gray["700"],
});

export const popupCalendarHeaderButtonStyle = style({
  cursor: "pointer",
  padding: THEME.spacing.xs2,
  borderRadius: THEME.spacing.xs2,
  border: "none",
  background: "transparent",
  fill: THEME.color.gray["700"],
  ":hover": {
    backgroundColor: THEME.color.green["300"],
    fill: THEME.color.green["800"],
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    fill: THEME.color.white["800"],
  },
});

export const popupCalendarHeaderSpacerStyle = style({
  width: THEME.spacing.xl,
  height: THEME.spacing.xl,
});
