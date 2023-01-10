import { styleVariants } from "@vanilla-extract/css";
import { WHITE_SPACE_MAP } from "@wizleap-inc/wiz-ui-constants";

export const whiteSpaceStyle = styleVariants(WHITE_SPACE_MAP, (whiteSpace) => ({
  whiteSpace,
}));
