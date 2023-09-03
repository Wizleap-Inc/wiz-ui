import { style, styleVariants } from "@vanilla-extract/css";
import { ColorKeys, THEME } from "@wizleap-inc/wiz-ui-constants";

export const tagStyle = style({
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const tagColorStyle = styleVariants({
  info: {
    backgroundColor: THEME.color.blue[800],
    color: THEME.color.white[800],
  },
  red: {
    backgroundColor: THEME.color.red[300],
    color: THEME.color.red[800],
  },
  green: {
    backgroundColor: THEME.color.green[300],
    color: THEME.color.green[800],
  },
  yellow: {
    backgroundColor: THEME.color.yellow[300],
    color: THEME.color.yellow[800],
  },
  blue: {
    backgroundColor: THEME.color.blue[300],
    color: THEME.color.blue[800],
  },
  mono: {
    backgroundColor: THEME.color.gray[300],
    color: THEME.color.gray[900],
  },
  gray: {
    backgroundColor: THEME.color.gray[600],
    color: THEME.color.white[800],
  },
  darkGray: {
    backgroundColor: THEME.color.gray[700],
    color: THEME.color.white[800],
  },
  greenFill: {
    backgroundColor: THEME.color.green[800],
    color: THEME.color.white[800],
  },
  white: {
    backgroundColor: THEME.color.white[800],
    color: THEME.color.gray[800],
    border: `1px solid ${THEME.color.gray[400]}`,
  },
});

export const tagIconColorStyle: Record<string, ColorKeys> = {
  info: "white.800",
  red: "red.800",
  green: "green.800",
  yellow: "yellow.800",
  blue: "blue.800",
  mono: "gray.900",
  gray: "white.800",
  darkGray: "white.800",
  greenFill: "white.800",
  white: "gray.800",
};
