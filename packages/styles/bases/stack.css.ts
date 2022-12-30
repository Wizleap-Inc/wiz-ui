import { style, styleVariants } from "@vanilla-extract/css";

export const stackStyle = style({
  display: "flex",
});

export const stackDirectionStyle = styleVariants({
  vertical: {
    flexDirection: "column",
  },
  horizontal: {
    flexDirection: "row",
  },
  verticalReverse: {
    flexDirection: "column-reverse",
  },
  horizontalReverse: {
    flexDirection: "row-reverse",
  },
});

export const stackAlignStyle = styleVariants({
  start: {
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  end: {
    alignItems: "flex-end",
  },
  stretch: {
    alignItems: "stretch",
  },
});

export const stackJustifyStyle = styleVariants({
  start: {
    justifyContent: "flex-start",
  },
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
  between: {
    justifyContent: "space-between",
  },
  around: {
    justifyContent: "space-around",
  },
  evenly: {
    justifyContent: "space-evenly",
  },
});

export const stackPositionStyle = styleVariants({
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  fixed: {
    position: "fixed",
  },
  static: {
    position: "static",
  },
  sticky: {
    position: "sticky",
  },
});

export const stackWrapStyle = style({
  flexWrap: "wrap",
});
