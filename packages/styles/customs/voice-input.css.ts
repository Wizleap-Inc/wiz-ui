import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const voiceInputStyle = style({
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  padding: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  lineHeight: 1.5,
  color: THEME.color.gray[700],
  display: "inline-flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: THEME.spacing.xs,
});

export const voiceInputExpandStyle = style({
  width: "100%",
});

export const voiceInputDisabledStyle = style({
  backgroundColor: THEME.color.gray[300],
  cursor: "not-allowed",
});

export const voiceInputTextAreaStyle = style({
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  border: "none",
  outline: "none",
  resize: "none",
  "::placeholder": {
    color: THEME.color.gray[500],
  },
  ":disabled": {
    opacity: 0.5,
    color: THEME.color.gray[700],
    backgroundColor: THEME.color.gray[300],
    cursor: "not-allowed",
  },
  selectors: {
    "&:disabled::placeholder": {
      color: THEME.color.gray[700],
    },
  },
});

export const voiceInputButtonStyle = style({
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  ":disabled": {
    cursor: "not-allowed",
  },
});
