export const DIRECTION_MAP = {
  topLeft: "tl",
  topRight: "tr",
  top: "tc",
  bottomLeft: "bl",
  bottomRight: "br",
  bottom: "bc",
  rightTop: "rt",
  rightBottom: "rb",
  right: "rc",
  leftTop: "lt",
  leftBottom: "lb",
  left: "lc",
} as const;

export type DirectionKeys = keyof typeof DIRECTION_MAP;

export type DirectionValues = (typeof DIRECTION_MAP)[DirectionKeys];

export const createDirectionValue = ({
  first,
  second,
}:
  | {
      first: "b" | "t";
      second: "l" | "c" | "r";
    }
  | {
      first: "l" | "r";
      second: "t" | "c" | "b";
    }) => {
  return `${first}${second}` as DirectionValues;
};
