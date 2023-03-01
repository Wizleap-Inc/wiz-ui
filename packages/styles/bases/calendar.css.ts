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
  width: "100%",
  padding: `calc((${THEME.spacing.xs2} + ${THEME.spacing.xs}) / 2) 0`,
  fontSize: THEME.fontSize.xs2,
});

export const calendarItemStyle = styleVariants({
  dayOfWeek: {
    background: "none",
    color: THEME.color.gray[600],
    textAlign: "center",
  },
  selected: {
    color: THEME.color.white[800],
    textAlign: "center",
    background: THEME.color.green[800],
    borderRadius: THEME.spacing.xs2,
  },
  inCurrentMonth: {
    color: THEME.color.gray[700],
    textAlign: "center",
    borderRadius: THEME.spacing.xs2,
    cursor: "pointer",
    background: "none",

    ":hover": {
      backgroundColor: THEME.color.green[300],
      color: THEME.color.green[800],
    },
    ":active": {
      backgroundColor: THEME.color.green[800],
      color: THEME.color.white[800],
    },
  },
  outOfCurrentMonth: {
    background: "none",
    color: THEME.color.gray[500],
    textAlign: "center",
    borderRadius: THEME.spacing.xs2,
  },
});
