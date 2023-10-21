import { keyframes, style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const LoadingOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: THEME.zIndex.overlay,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  background: THEME.color.white["800"],
  opacity: 1,
});

export const LoadingOverlayBar = style({
  width: "7.5rem",
  height: "0.5rem",
  borderRadius: THEME.spacing.max,
  overflow: "hidden",
  background: THEME.color.gray["400"],
});

const loadingOverlayInnerSlide = keyframes({
  from: {
    transform: "translateX(-100%)",
  },
  to: {
    transform: "translateX(100%)",
  },
});

export const LoadingOverlayBarInner = style({
  width: "100%",
  height: "100%",
  background: THEME.color.green["800"],
  position: "relative",
  animation: `${loadingOverlayInnerSlide} 1.4s ease-in-out infinite`,
  borderRadius: THEME.spacing.max,
});

export const LoadingOverlayHidden = style({
  display: "none",
});
