import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const rangeDatePickerBaseStyle = style({
  height: THEME.spacing.xl3,
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const rangeDatePickerStyle = styleVariants({
  active: [
    rangeDatePickerBaseStyle,
    {
      background: THEME.color.white["800"],
      cursor: "pointer",
    },
  ],
  disabled: [
    rangeDatePickerBaseStyle,
    {
      background: THEME.color.gray["300"],
      cursor: "default",
    },
  ],
});

export const rangeDatePickerWidthStyle = styleVariants({
  default: {
    width: "10rem",
  },
  expanded: {
    width: "100%",
  },
});

export const rangeDatePickerSeparatorStyle = style({
  color: THEME.color.gray["500"],
});

const rangeDatePickerInputTextBaseStyle = style({
  fontSize: THEME.fontSize.sm,
  width: "100%",
});

export const rangeDatePickerInputTextStyle = styleVariants({
  default: [
    rangeDatePickerInputTextBaseStyle,
    {
      color: THEME.color.gray["500"],
    },
  ],
  selected: [
    rangeDatePickerInputTextBaseStyle,
    {
      color: THEME.color.gray["700"],
    },
  ],
});

export const rangeDatePickerPopupStyle = style({
  display: "flex",
  flexDirection: "column",
});

export const rangeDatePickerPopupCalendarsStyle = style({
  display: "flex",
});

const rangeDatePickerPopupCalendarContainerBaseStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: THEME.spacing.xs2,
});

export const rangeDatePickerPopupCalendarContainerStyle = styleVariants({
  left: [
    rangeDatePickerPopupCalendarContainerBaseStyle,
    {
      paddingRight: THEME.spacing.xs,
      borderRight: `1px solid ${THEME.color.gray["300"]}`,
    },
  ],
  right: [
    rangeDatePickerPopupCalendarContainerBaseStyle,
    {
      paddingLeft: THEME.spacing.xs,
    },
  ],
});

export const rangeDatePickerPopupCalendarHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: THEME.spacing.xl,
  width: "100%",
});

export const rangeDatePickerPopupCalendarMonthStyle = style({
  fontSize: THEME.fontSize.xs,
  color: THEME.color.gray["700"],
});

export const rangeDatePickerPopupCalendarHeaderButtonStyle = style({
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

export const rangeDatePickerPopupCalendarHeaderSpacerStyle = style({
  width: THEME.spacing.xl,
  height: THEME.spacing.xl,
});
