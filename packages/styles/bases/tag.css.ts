import { style, styleVariants } from "@vanilla-extract/css";
import { ColorKeys, FontSizeKeys, THEME } from "@wizleap-inc/wiz-ui-constants";

export const tagStyle = style({
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
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
  redFill: {
    backgroundColor: THEME.color.red[800],
    color: THEME.color.white[800],
  },
  green: {
    backgroundColor: THEME.color.green[300],
    color: THEME.color.green[800],
  },
  yellow: {
    backgroundColor: THEME.color.yellow[300],
    color: THEME.color.yellow[800],
  },
  yellowFill: {
    backgroundColor: THEME.color.yellow[800],
    color: THEME.color.white[800],
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
    border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[400]}`,
  },
});

export const tagIconColorStyle: Record<string, ColorKeys> = {
  info: "white.800",
  red: "red.800",
  green: "green.800",
  yellow: "yellow.800",
  yellowFill: "white.800",
  blue: "blue.800",
  mono: "gray.900",
  gray: "white.800",
  darkGray: "white.800",
  greenFill: "white.800",
  redFill: "white.800",
  white: "gray.800",
};
export const tagIconSize: { [key in FontSizeKeys]: FontSizeKeys } = {
  xs3: "xs",
  xs2: "md",
  xs: "xl",
  sm: "xl2",
  md: "xl3",
  lg: "xl4",
  xl: "xl5",
  xl2: "xl6",
  xl3: "xl6",
  xl4: "xl6",
  xl5: "xl6",
  xl6: "xl6",
};
