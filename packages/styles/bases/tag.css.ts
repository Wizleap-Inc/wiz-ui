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
  error: {
    backgroundColor: THEME.color.red[300],
    color: THEME.color.red[800],
  },
  success: {
    backgroundColor: THEME.color.green[300],
    color: THEME.color.gray[700],
  },
  warning: {
    backgroundColor: THEME.color.yellow[300],
    color: THEME.color.gray[700],
  },
  mono: {
    backgroundColor: THEME.color.gray[300],
    color: THEME.color.gray[900],
  },
});

export const tagIconColorStyle: Record<string, ColorKeys> = {
  info: "white.800",
  error: "red.800",
  success: "green.800",
  warning: "yellow.800",
  mono: "gray.900",
};
