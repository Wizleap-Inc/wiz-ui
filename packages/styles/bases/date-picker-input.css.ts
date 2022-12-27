import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const datePickerStyle = style({
  width: "max-content",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs2}`,
  height: THEME.spacing.xl3,
  background: THEME.color.white["800"],
  border: "1px solid " + THEME.color.gray["400"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const datePickerActiveStyle = style({
  borderColor: THEME.color.green["800"],
});

export const datePickerDisabledStyle = style({
  color: THEME.color.gray["700"],
  backgroundColor: THEME.color.gray["300"],
  cursor: "not-allowed",
});

export const datePickerBoxStyle = style({
  height: "100%",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
});

export const datePickerBoxColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["500"],
  },
  selected: {
    color: THEME.color.gray["700"],
  },
});

export const datePickerSelectorStyle = style({
  position: "absolute",
  top: "calc(100% + 2px)",
  left: "0",
  width: "auto",
  padding: THEME.spacing.xs,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs,
  boxSizing: "border-box",
});

export const datePickerButtonBoxStyle = style({
  gap: THEME.spacing.xs,
  display: "flex",
});

export const datePickerButtonBoxItemStyle = style({
  cursor: "pointer",
  padding: THEME.spacing.xs,
  borderRadius: THEME.spacing.xs,
  ":hover": {
    backgroundColor: THEME.color.green["300"],
    color: THEME.color.green["800"],
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    color: THEME.color.white["800"],
  },
});
