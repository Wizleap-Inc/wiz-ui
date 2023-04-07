import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const cardTableStyle = style({
  borderCollapse: "separate",
  borderSpacing: `0 calc(${THEME.spacing.xs2} + ${THEME.spacing.xs} * 2)`,
});

export const cardTableFixedStyle = style({
  tableLayout: "fixed",
});

export const cardTdStyle = style({
  padding: `${THEME.spacing.xs2} ${THEME.spacing.sm}`,
  borderLeft: `1px solid ${THEME.color.gray[300]}`,

  ":first-child": {
    borderLeft: "none",
  },
});

export const cardThStyle = style({
  color: THEME.color.gray[500],
  fontSize: THEME.fontSize.xs2,
  fontWeight: "normal",
});

export const cardTrStyle = style({
  selectors: {
    "tbody > &": {
      position: "relative",
      cursor: "pointer",
    },
    "tbody > &::after": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `calc(100% + ${THEME.spacing.xs} * 2)`,
      transform: `translateY(calc(-1 * ${THEME.spacing.xs}))`,
      borderRadius: THEME.spacing.xs2,
      background: THEME.color.white[800],
      zIndex: -1,
      boxSizing: "border-box",
      border: `1px solid ${THEME.color.gray[300]}`,
    },
    "tbody > &:hover::after": {
      "@media": {
        "(any-hover: hover)": {
          border: `2px solid ${THEME.color.green[800]}`,
        },
      },
    },
    "tbody > &:active::after": {
      background: THEME.color.green[300],
    },
  },
});
