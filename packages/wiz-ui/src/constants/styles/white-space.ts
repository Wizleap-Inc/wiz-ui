import { WhiteSpaceKeys } from "@/types/styles/white-space";
export const WHITE_SPACE_MAP = {
  normal: "normal",
  nowrap: "nowrap",
  pre: "pre",
  preLine: "pre-line",
  preWrap: "pre-wrap",
  breakSpaces: "break-spaces",
} as const;

export const SPACING_ACCESSORS = Object.keys(
  WHITE_SPACE_MAP
) as WhiteSpaceKeys[];
