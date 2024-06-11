import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const calendarStyle = style({
  width: "200px",
  borderSpacing: 0,
});

export const calendarCellStyle = style({
  padding: 0,
});

export const calendarItemCommonStyle = style({
  border: "none",
  width: "2rem",
  height: "2rem",
  padding: 0,
  display: "flex",
  fontSize: THEME.fontSize.xs2,
  lineHeight: THEME.fontSize.xs,
  backgroundColor: "transparent",
});

export const calendarItemContainerStyle = style({
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const calendarPrimaryItemContainerStyle = style({
  background: THEME.color.green[300],
});

const calendarItemBaseStyle = style({
  height: "100%",
  width: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const calendarItemStyle = styleVariants({
  dayOfWeek: [
    calendarItemBaseStyle,
    {
      background: "none",
      color: THEME.color.gray[600],
      textAlign: "center",
      border: "none",
      width: "100%",
      height: THEME.spacing.lg,
      padding: `${THEME.spacing.xs2} 0`,
      fontSize: THEME.fontSize.xs2,
      lineHeight: THEME.fontSize.xs,
    },
  ],
  primary: [
    calendarItemBaseStyle,
    {
      color: THEME.color.white[800],
      textAlign: "center",
      background: THEME.color.green[800],
      borderRadius: THEME.spacing.xs2,
      cursor: "pointer",
    },
  ],
  secondary: [
    calendarItemBaseStyle,
    {
      color: THEME.color.green[800],
      textAlign: "center",
      background: THEME.color.green[300],
      cursor: "pointer",
    },
  ],
  inCurrentMonth: [
    calendarItemBaseStyle,
    {
      color: THEME.color.gray[800],
      textAlign: "center",
      borderRadius: THEME.spacing.xs2,
      cursor: "pointer",
      background: "none",
      "@media": {
        "(any-hover: hover)": {
          ":hover": {
            backgroundColor: THEME.color.green[300],
            color: THEME.color.green[800],
          },
        },
      },
      ":active": {
        backgroundColor: THEME.color.green[800],
        color: THEME.color.white[800],
      },
    },
  ],
  outOfCurrentMonth: [
    calendarItemBaseStyle,
    {
      background: "none",
      color: THEME.color.gray[500],
      textAlign: "center",
      borderRadius: THEME.spacing.xs2,
    },
  ],
  disabledDate: [
    calendarItemBaseStyle,
    {
      background: "none",
      color: THEME.color.gray[500],
      textAlign: "center",
      borderRadius: THEME.spacing.xs2,
    },
  ],
});
