export const DIRECTION_MAP = {
  topLeft: "topLeft",
  topRight: "topRight",
  top: "topCenter",
  bottomLeft: "bottomLeft",
  bottomRight: "bottomRight",
  bottom: "bottomCenter",
  rightTop: "rightTop",
  rightBottom: "rightBottom",
  right: "rightCenter",
  leftTop: "leftTop",
  leftBottom: "leftBottom",
  left: "leftCenter",
} as const;

export type DirectionKey = keyof typeof DIRECTION_MAP;

export type DirectionValue = (typeof DIRECTION_MAP)[DirectionKey];
