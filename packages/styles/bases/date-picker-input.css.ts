import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const datePickerStyle = style({
  width: "max-content",
  padding: "0 8px",
  height: "40px",
  background: THEME.color.white["800"],
  border: "1px solid " + THEME.color.gray["400"],
  borderRadius: "8px",
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
  padding: "0 8px",
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
  padding: "8px",
  background: THEME.color.white["800"],
  borderRadius: "8px",
  boxSizing: "border-box",
});

export const datePickerButtonBoxStyle = style({
  gap: "8px",
  display: "flex",
});

export const datePickerButtonBoxItemStyle = style({
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  ":hover": {
    backgroundColor: THEME.color.green["300"],
    color: THEME.color.green["800"],
  },
  ":active": {
    backgroundColor: THEME.color.green["800"],
    color: THEME.color.white["800"],
  },
});
