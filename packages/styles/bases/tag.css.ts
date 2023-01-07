import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tagStlye = style({
  borderRadius: THEME.spacing.xs2,
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "max-content",
});
