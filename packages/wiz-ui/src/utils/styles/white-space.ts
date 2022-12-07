import { WHITE_SPACE_MAP } from "@/constants/styles/white-space";
import { WhiteSpaceKeys } from "@/types/styles/white-space";

export const getWhiteSpaceCss = (whiteSpace: WhiteSpaceKeys) =>
  WHITE_SPACE_MAP[whiteSpace];
