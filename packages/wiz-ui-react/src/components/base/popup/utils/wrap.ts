import { DirectionValues, createDirectionValue } from "../types/direction";

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
  t_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const v = isOutOfBound.top(bound, content, anchor) ? "b" : "t";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  b_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const v = isOutOfBound.bottom(bound, content, anchor) ? "t" : "b";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  r_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const h = isOutOfBound.right(bound, content, anchor) ? "l" : "r";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },

  l_: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const h = isOutOfBound.left(bound, content, anchor) ? "r" : "l";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },
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
    const f = reflection.b_(bound, content, anchor);
    const x = reflection._l(bound, content, anchor);
    return f(x);
  },
  bc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.b_(bound, content, anchor);
    const x = reflection.vc(bound, content, anchor);
    return f(x);
  },
  br: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.b_(bound, content, anchor);
    const x = reflection._r(bound, content, anchor);
    return f(x);
  },
  tl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.t_(bound, content, anchor);
    const x = reflection._l(bound, content, anchor);
    return f(x);
  },
  tc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.t_(bound, content, anchor);
    const x = reflection.vc(bound, content, anchor);
    return f(x);
  },
  tr: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.t_(bound, content, anchor);
    const x = reflection._r(bound, content, anchor);
    return f(x);
  },
  rt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.r_(bound, content, anchor);
    const y = reflection._t(bound, content, anchor);
    return f(y);
  },
  rc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.r_(bound, content, anchor);
    const y = reflection.hc(bound, content, anchor);
    return f(y);
  },
  rb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.r_(bound, content, anchor);
    const y = reflection._b(bound, content, anchor);
    return f(y);
  },
  lt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.l_(bound, content, anchor);
    const y = reflection._t(bound, content, anchor);
    return f(y);
  },
  lc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.l_(bound, content, anchor);
    const y = reflection.hc(bound, content, anchor);
    return f(y);
  },
  lb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const f = reflection.l_(bound, content, anchor);
    const y = reflection._b(bound, content, anchor);
    return f(y);
  },
};
