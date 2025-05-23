import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const cardTableStyle = style({
  borderCollapse: "separate",
  borderSpacing: `0 calc(${THEME.spacing.xs2} + ${THEME.spacing.xs} * 2)`,
});

export const cardTableOnSafariStyle = style({
  borderCollapse: "separate",
  borderSpacing: `0 ${THEME.spacing.xs}`,
});

export const cardTableFixedStyle = style({
  tableLayout: "fixed",
});

export const cardTableAlignStyle = styleVariants({
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

export const cardTdStyle = style({
  padding: `${THEME.spacing.xs2} ${THEME.spacing.sm}`,
  borderLeft: `${THEME.borderWidth.xs} solid ${THEME.color.gray[300]}`,

  ":first-child": {
    borderLeft: "none",
  },
});

export const cardTdOnSafariStyle = style({
  padding: `${THEME.spacing.sm} ${THEME.spacing.sm}`,
  position: "relative",
  ":after": {
    content: "''",
    position: "absolute",
    top: "50%",
    right: "-1px",
    transform: "translateY(-50%)",
    width: "1px",
    height: `calc(100% - ${THEME.spacing.md})`,
    backgroundColor: THEME.color.gray[300],
  },
  selectors: {
    "&:last-child::after ": {
      display: "none",
    },
  },
});

export const cardThStyle = style({
  color: THEME.color.gray[500],
  fontSize: THEME.fontSize.xs2,
  fontWeight: "normal",
});

export const cardThOnSafariStyle = style({
  color: THEME.color.gray[500],
  fontSize: THEME.fontSize.xs2,
  fontWeight: "normal",
  height: THEME.spacing.xl3,
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
      border: `${THEME.borderWidth.xs} solid ${THEME.color.gray[300]}`,
    },
    "tbody > &:hover::after": {
      "@media": {
        "(any-hover: hover)": {
          border: `${THEME.borderWidth.sm} solid ${THEME.color.green[800]}`,
        },
      },
    },
    "tbody > &:active::after": {
      background: THEME.color.green[300],
    },
  },
});

export const cardTrOnSafariStyle = style({
  selectors: {
    "tbody > &": {
      cursor: "pointer",
      content: "",
      top: 0,
      left: 0,
      width: "100%",
      height: `calc(100% + ${THEME.spacing.xs} * 2)`,
      transform: `translateY(calc(-1 * ${THEME.spacing.xs}))`,
      borderRadius: THEME.spacing.xs2,
      background: THEME.color.white[800],
      zIndex: -1,
      boxSizing: "border-box",
      outline: `${THEME.borderWidth.xs} solid ${THEME.color.gray[300]}`,
    },
    "tbody > &:hover": {
      "@media": {
        "(any-hover: hover)": {
          outline: `2px solid ${THEME.color.green[800]}`,
        },
      },
    },
    "tbody > &:active": {
      background: THEME.color.green[300],
    },
  },
});
