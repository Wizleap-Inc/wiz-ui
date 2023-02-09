import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const calendarStyle = style({
  fontSize: THEME.fontSize.xs2,
});

export const calendarItemStyle = styleVariants({
  default: {
    color: THEME.color.gray[600],
    padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
    textAlign: "center",
  },
  selected: {
    color: THEME.color.white[800],
    padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
    textAlign: "center",
    background: THEME.color.green[800],
    borderRadius: THEME.spacing.xs2,
  },
  inCurrentMonth: {
    color: THEME.color.gray[700],
    padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
    textAlign: "center",
    borderRadius: THEME.spacing.xs2,
    cursor: "pointer",

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
    color: THEME.color.gray[500],
    padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
    textAlign: "center",
    borderRadius: THEME.spacing.xs2,
    cursor: "pointer",
  },
});
