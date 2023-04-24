import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const TIME_COL_WIDTH = THEME.spacing.xl3;

export const schedule = style({
  position: "relative",
});

const baseCard = style({
  color: THEME.color.white[800],
  fontSize: THEME.fontSize.xs,
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: THEME.spacing.xs2,
});

export const card = styleVariants({
  primary: [
    baseCard,
    {
      backgroundColor: THEME.color.blue[800],
    },
  ],
  secondary: [
    baseCard,
    {
      backgroundColor: THEME.color.red[800],
    },
  ],
  tertiary: [
    baseCard,
    {
      backgroundColor: THEME.color.gray[400],
    },
  ],
});

export const sheet = style({
  width: "100%",
  borderSpacing: 0,
});

export const time = style({
  height: THEME.spacing.xl,
  width: TIME_COL_WIDTH,
  fontSize: THEME.fontSize.xs2,
  color: THEME.color.gray[600],
  verticalAlign: "top",
  textAlign: "center",
  borderRight: `2px solid ${THEME.color.gray[400]}`,
  boxSizing: "border-box",
  padding: 0,
});

export const timeSpace = style({
  display: "block",
});

export const cols = style({});

globalStyle(`${cols} + ${cols} > ${timeSpace}`, {
  borderTop: `1px solid ${THEME.color.gray[300]}`,
});

export const grid = style({
  position: "absolute",
  top: 0,
  left: 0,
  display: "grid",
  marginLeft: TIME_COL_WIDTH,
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  width: `calc(100% - ${TIME_COL_WIDTH})`,
  height: "100%",
  boxSizing: "border-box",
  gap: "1px",
});
