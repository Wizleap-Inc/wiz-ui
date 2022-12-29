import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const flatTableStyle = style({
  borderSpacing: 0,
});

export const flatTdStyle = style({
  fontSize: THEME.fontSize.sm,
  padding: THEME.spacing.sm,
  color: THEME.color.gray[700],
  background: THEME.color.white[800],
  border: `1px solid ${THEME.color.gray[300]}`,
});

export const flatTdAlignStyle = styleVariants({
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});

export const flatTh = style({
  fontSize: THEME.fontSize.sm,
  fontWeight: "bold",
  padding: THEME.spacing.sm,
});

export const flatThVariantStyle = styleVariants({
  col: {
    color: THEME.color.white[800],
    background: THEME.color.green[800],
    border: `1px solid ${THEME.color.gray[300]}`,
    textAlign: "center",
  },
  row: {
    color: THEME.color.gray[700],
    background: THEME.color.gray[300],
    border: `1px solid ${THEME.color.gray[400]}`,
    textAlign: "left",
  },
});
