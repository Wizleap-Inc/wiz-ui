import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const cardStyle = style({
  width: "100%",
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const cardBodyStyle = style({
  width: "100%",
});

export const cardShadowStyle = style({
  boxShadow: THEME.shadow.md,
});

const cardBorderBase = style({
  borderWidth: "1px",
});

export const cardBorderStyle = styleVariants({
  solid: [cardBorderBase, { borderStyle: "solid" }],
  dashed: [cardBorderBase, { borderStyle: "dashed" }],
  dotted: [cardBorderBase, { borderStyle: "dotted" }],
});

export const cardFitStyle = style({
  width: "fit-content",
});

export const cardHexpandStyle = style({
  height: "100%",
});

export const cardHeaderStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const cardHeaderMainStyle = style({
  display: "flex",
  alignItems: "center",
  gap: THEME.spacing.xs2,
});
