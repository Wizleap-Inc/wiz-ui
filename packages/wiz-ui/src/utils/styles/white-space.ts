import { WHITE_SPACE_MAP } from "@wiz-ui/constants/styles/white-space";
import { WhiteSpaceKeys } from "@wiz-ui/constants/styles/white-space";

export const getWhiteSpaceCss = (whiteSpace: WhiteSpaceKeys) =>
  WHITE_SPACE_MAP[whiteSpace];
