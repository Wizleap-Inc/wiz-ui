import { styleVariants } from "@vanilla-extract/css";
import { Z_INDEX_MAP } from "@wizleap-inc/wiz-ui-constants/styles/z-index";

export const zIndexStyle = styleVariants(Z_INDEX_MAP, (zIndex) => ({
  zIndex,
}));
