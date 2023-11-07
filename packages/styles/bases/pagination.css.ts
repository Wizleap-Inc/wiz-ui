import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const PAGINATION_BTN_SIZE = THEME.spacing.xl3;
const PAGINATION_GAP_SIZE = THEME.spacing.md;

export const paginationStyle = style({
  width: "fit-content",
  background: THEME.color.white[500],
  borderRadius: THEME.spacing.max,
  padding: THEME.spacing.sm,
  display: "flex",
  gap: PAGINATION_GAP_SIZE,
});

export const paginationGapStyle = styleVariants({
  left: {
    marginLeft: `calc(${PAGINATION_BTN_SIZE} + ${PAGINATION_GAP_SIZE})`,
  },
  right: {
    marginRight: `calc(${PAGINATION_BTN_SIZE} + ${PAGINATION_GAP_SIZE})`,
  },
});

export const paginationButtonStyle = style({
  fontSize: THEME.fontSize.sm,
  height: PAGINATION_BTN_SIZE,
  width: PAGINATION_BTN_SIZE,
  borderRadius: THEME.spacing.max,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
});

export const paginationButtonVariantStyle = styleVariants({
  default: {
    background: THEME.color.white[500],
    color: THEME.color.gray[700],
    "@media": {
      "(any-hover: hover)": {
        ":hover": {
          background: THEME.color.green[300],
          color: THEME.color.green[800],
        },
      },
    },
    ":active": {
      background: THEME.color.green[800],
      color: THEME.color.white[800],
      fill: THEME.color.white[800],
    },
  },
  active: {
    background: THEME.color.green[800],
    color: THEME.color.white[800],
  },
});

export const paginationIconStyle = style({
  fill: THEME.color.gray[700],
  fontSize: THEME.fontSize.xl2,
});
