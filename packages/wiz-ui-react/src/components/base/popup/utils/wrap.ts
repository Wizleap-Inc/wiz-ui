import { DirectionValues } from "../types/direction";

const isOutOfBound = {
  top: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.y - content.height + window.scrollY < 0,
  bottom: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  left: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.x - content.width + window.scrollX < 0,
  right: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.width < anchor.x + anchor.width + content.width + window.scrollX,
  rightOnV: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.width < anchor.x + content.width + window.scrollX,
  leftOnV: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.x + anchor.width - content.width + window.scrollX < 0,
  topOnH: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.y + anchor.height - content.height + window.scrollY < 0,
  bottomOnH: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  leftOnHCenter: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0,
  rightOnHCenter: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.width <
    anchor.x + (anchor.width + content.width) / 2 + window.scrollX,
  topOnVCenter: (_: DOMRect, content: DOMRect, anchor: DOMRect) =>
    anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0,
  bottomOnVCenter: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    bound.height <
    anchor.y + (anchor.width + content.height) / 2 + window.scrollY,
};

export const wrapDirection: Record<
  DirectionValues,
  (bound: DOMRect, content: DOMRect, anchor: DOMRect) => DirectionValues
> = {
  bl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.bottom(bound, content, anchor) ? "t" : "b";
    const x = isOutOfBound.rightOnV(bound, content, anchor) ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  bc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.bottom(bound, content, anchor) ? "t" : "b";
    const r = isOutOfBound.rightOnHCenter(bound, content, anchor) && "r";
    const l = isOutOfBound.leftOnHCenter(bound, content, anchor) && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  br: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.bottom(bound, content, anchor) ? "t" : "b";
    const x = isOutOfBound.leftOnV(bound, content, anchor) ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  tl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.top(bound, content, anchor) ? "b" : "t";
    const x = isOutOfBound.rightOnV(bound, content, anchor) ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  tc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.top(bound, content, anchor) ? "b" : "t";
    const r = isOutOfBound.rightOnHCenter(bound, content, anchor) && "r";
    const l = isOutOfBound.leftOnHCenter(bound, content, anchor) && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  tr: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = isOutOfBound.top(bound, content, anchor) ? "b" : "t";
    const x = isOutOfBound.leftOnV(bound, content, anchor) ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  rt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.right(bound, content, anchor) ? "l" : "r";
    const y = isOutOfBound.bottomOnH(bound, content, anchor) ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  rc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.right(bound, content, anchor) ? "l" : "r";
    const b = isOutOfBound.bottomOnVCenter(bound, content, anchor) && "b";
    const t = isOutOfBound.topOnVCenter(bound, content, anchor) && "t";
    return `${x}${t || b || "c"}` as DirectionValues;
  },
  rb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.right(bound, content, anchor) ? "l" : "r";
    const y = isOutOfBound.topOnH(bound, content, anchor) ? "t" : "b";
    return `${x}${y}` as DirectionValues;
  },
  lt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.left(bound, content, anchor) ? "r" : "l";
    const y = isOutOfBound.bottomOnH(bound, content, anchor) ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  lc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.left(bound, content, anchor) ? "r" : "l";
    const b = isOutOfBound.bottomOnVCenter(bound, content, anchor) && "b";
    const t = isOutOfBound.topOnVCenter(bound, content, anchor) && "t";
    return `${x}${t || b || "c"}` as DirectionValues;
  },
  lb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = isOutOfBound.left(bound, content, anchor) ? "r" : "l";
    const y = isOutOfBound.topOnH(bound, content, anchor) ? "t" : "b";
    return `${x}${y}` as DirectionValues;
  },
};
