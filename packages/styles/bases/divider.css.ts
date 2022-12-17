import { style, styleVariants } from "@vanilla-extract/css";

const baseDividerStyle = style({
  margin: 0,
});

export const dividerStyle = styleVariants({
  solid: [baseDividerStyle, { borderStyle: "solid" }],
  dashed: [baseDividerStyle, { borderStyle: "dashed" }],
  dotted: [baseDividerStyle, { borderStyle: "dotted" }],
});

export const dividerDirectionStyle = styleVariants({
  horizontal: {
    width: "100%",
    borderWidth: "0 0 1px 0",
  },
  vertical: {
    height: "100%",
    borderWidth: "0 1px 0 0",
  },
});
