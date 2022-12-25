import { style } from "@vanilla-extract/css";

export const dialogStyle = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.3s ease-in-out",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export const dialogVisibleStyle = style({
  opacity: 1,
  pointerEvents: "auto",
});

export const dialogMaskStyle = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
