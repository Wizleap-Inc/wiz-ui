import { styleVariants } from "@vanilla-extract/css";

export const fontWeightStyle = styleVariants({
  thin: {
    fontWeight: 100,
  },
  normal: {
    fontWeight: 400,
  },
  bold: {
    fontWeight: 700,
  },
});
