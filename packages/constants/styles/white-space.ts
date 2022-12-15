export const WHITE_SPACE_MAP = {
  normal: "normal",
  nowrap: "nowrap",
  pre: "pre",
  preLine: "pre-line",
  preWrap: "pre-wrap",
  breakSpaces: "break-spaces",
} as const;

export type WhiteSpaceKeys = keyof typeof WHITE_SPACE_MAP;

export const WHITE_SPACE_MAP_ACCESSORS = Object.keys(
  WHITE_SPACE_MAP
) as WhiteSpaceKeys[];

export const getWhiteSpaceCss = (key: WhiteSpaceKeys): string =>
  WHITE_SPACE_MAP[key];
