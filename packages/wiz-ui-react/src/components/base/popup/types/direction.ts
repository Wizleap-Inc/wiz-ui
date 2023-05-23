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

export type DirectionKey = keyof typeof DIRECTION_MAP;

export type DirectionValue = (typeof DIRECTION_MAP)[DirectionKey];
