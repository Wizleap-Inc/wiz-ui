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

const reflection = {
  t_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.top(bound, content, anchor) ? "b" : "t",
  b_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.bottom(bound, content, anchor) ? "t" : "b",
  r_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.right(bound, content, anchor) ? "l" : "r",
  l_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.left(bound, content, anchor) ? "r" : "l",
  _l: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.rightOnV(bound, content, anchor) ? "r" : "l",
  _r: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.leftOnV(bound, content, anchor) ? "l" : "r",
  _t: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.bottomOnH(bound, content, anchor) ? "b" : "t",
  _b: (bound: DOMRect, content: DOMRect, anchor: DOMRect) =>
    isOutOfBound.topOnH(bound, content, anchor) ? "t" : "b",
  vc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const r = isOutOfBound.rightOnHCenter(bound, content, anchor) && "r";
    const l = isOutOfBound.leftOnHCenter(bound, content, anchor) && "l";
    return l || r || "c";
  },
  hc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const b = isOutOfBound.bottomOnVCenter(bound, content, anchor) && "b";
    const t = isOutOfBound.topOnVCenter(bound, content, anchor) && "t";
    return t || b || "c";
  },
};

export const wrapDirection: Record<
  DirectionValues,
  (bound: DOMRect, content: DOMRect, anchor: DOMRect) => DirectionValues
> = {
  bl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.b_(bound, content, anchor);
    const x = reflection._l(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  bc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.b_(bound, content, anchor);
    const x = reflection.vc(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  br: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.b_(bound, content, anchor);
    const x = reflection._r(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  tl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.t_(bound, content, anchor);
    const x = reflection._l(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  tc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.t_(bound, content, anchor);
    const x = reflection.vc(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  tr: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = reflection.t_(bound, content, anchor);
    const x = reflection._r(bound, content, anchor);
    return `${y}${x}` as DirectionValues;
  },
  rt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.r_(bound, content, anchor);
    const y = reflection._t(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
  rc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.r_(bound, content, anchor);
    const y = reflection.hc(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
  rb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.r_(bound, content, anchor);
    const y = reflection._b(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
  lt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.l_(bound, content, anchor);
    const y = reflection._t(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
  lc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.l_(bound, content, anchor);
    const y = reflection.hc(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
  lb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = reflection.l_(bound, content, anchor);
    const y = reflection._b(bound, content, anchor);
    return `${x}${y}` as DirectionValues;
  },
};
