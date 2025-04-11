import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const flatTableStyle = style({
  borderSpacing: 0,
});

export const flatTableFixedStyle = style({
  tableLayout: "fixed",
});

export const flatTdStyle = style({
  fontSize: THEME.fontSize.sm,
  padding: THEME.spacing.sm,
  color: THEME.color.gray[700],
  background: THEME.color.white[800],
  border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[300]}`,
});

export const flatTableAlignStyle = styleVariants({
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
  verticalAlign: "top",
});

export const flatThVariantStyle = styleVariants({
  col: {
    color: THEME.color.white[800],
    background: THEME.color.green[800],
    border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[300]}`,
  },
  row: {
    color: THEME.color.gray[700],
    background: THEME.color.gray[300],
    border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[400]}`,
  },
});
