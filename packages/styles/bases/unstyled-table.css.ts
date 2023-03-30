import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const unstyledTableBorderCollapseStyle = styleVariants({
  collapse: {
    borderCollapse: "collapse",
  },
  separate: {
    borderCollapse: "separate",
  },
});

export const unstyledTableFixedStyle = style({
  tableLayout: "fixed",
});

export const unstyledTheadDividerStyle = style({
  borderBottom: `1px solid ${THEME.color.gray["400"]}`,
});

export const unstyledTrDividerStyle = style({
  borderBottom: `1px solid ${THEME.color.gray["300"]}`,
});

export const unstyledTdStyle = style({
  fontSize: THEME.fontSize.sm,
  padding: 0,
});

export const unstyledTdAlignStyle = styleVariants({
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

export const unstyledTh = style({
  fontSize: THEME.fontSize.sm,
  fontWeight: "bold",
});
