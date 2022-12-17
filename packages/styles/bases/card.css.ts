import { style } from "@vanilla-extract/css";
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

export const cardBorderStyle = style({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: THEME.color.gray[400],
});

export const cardFitStyle = style({
  width: "fit-content",
});

export const cardHeaderStyle = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const cardHeaderMainStyle = style({
  display: "flex",
  alignItems: "center",
  gap: THEME.spacing.xs2,
});

export const cardHeaderTitleStyle = style({
  fontSize: THEME.fontSize.md,
  fontWeight: "bold",
  color: THEME.color.gray[700],
});
