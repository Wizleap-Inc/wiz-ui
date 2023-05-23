import { DirectionValues, createDirectionValue } from "../types/direction";

export type Args = {
  bound: DOMRect;
  content: DOMRect;
  anchor: DOMRect;
  window: {
    scrollX: number;
    scrollY: number;
  };
};

export const isOutOfBound = {
  top: ({ anchor, content, window }: Args) =>
    anchor.y - content.height + window.scrollY < 0,
  bottom: ({ bound, anchor, content, window }: Args) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  left: ({ anchor, content, window }: Args) =>
    anchor.x - content.width + window.scrollX < 0,
  right: ({ bound, anchor, content, window }: Args) =>
    bound.width < anchor.x + anchor.width + content.width + window.scrollX,
  rightOnV: ({ bound, anchor, content, window }: Args) =>
    bound.width < anchor.x + content.width + window.scrollX,
  leftOnV: ({ anchor, content, window }: Args) =>
    anchor.x + anchor.width - content.width + window.scrollX < 0,
  topOnH: ({ anchor, content, window }: Args) =>
    anchor.y + anchor.height - content.height + window.scrollY < 0,
  bottomOnH: ({ bound, anchor, content, window }: Args) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  leftOnHCenter: ({ anchor, content, window }: Args) =>
    anchor.x + (anchor.width - content.width) / 2 + window.scrollX < 0,
  rightOnHCenter: ({ bound, anchor, content, window }: Args) =>
    bound.width <
    anchor.x + (anchor.width + content.width) / 2 + window.scrollX,
  topOnVCenter: ({ anchor, content, window }: Args) =>
    anchor.y + (anchor.height - content.height) / 2 + window.scrollY < 0,
  bottomOnVCenter: ({ bound, anchor, content, window }: Args) =>
    bound.height <
    anchor.y + (anchor.height + content.height) / 2 + window.scrollY,
};

export const reflection = {
  t_: (input: Args) => {
    const v = isOutOfBound.top(input) ? "b" : "t";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  b_: (input: Args) => {
    const v = isOutOfBound.bottom(input) ? "t" : "b";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  r_: (input: Args) => {
    const h = isOutOfBound.right(input) ? "l" : "r";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },

  l_: (input: Args) => {
    const h = isOutOfBound.left(input) ? "r" : "l";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },
  _l: (input: Args) => (isOutOfBound.rightOnV(input) ? "r" : "l"),
  _r: (input: Args) => (isOutOfBound.leftOnV(input) ? "l" : "r"),
  _t: (input: Args) => (isOutOfBound.bottomOnH(input) ? "b" : "t"),
  _b: (input: Args) => (isOutOfBound.topOnH(input) ? "t" : "b"),
  vc: (input: Args) => {
    const r = isOutOfBound.rightOnHCenter(input) && "r";
    const l = isOutOfBound.leftOnHCenter(input) && "l";
    return l || r || "c";
  },
  hc: (input: Args) => {
    const b = isOutOfBound.bottomOnVCenter(input) && "b";
    const t = isOutOfBound.topOnVCenter(input) && "t";
    return t || b || "c";
  },
};

export const wrapDirection: Record<
  DirectionValues,
  (input: Args) => DirectionValues
> = {
  bl: (input: Args) => {
    const f = reflection.b_(input);
    const x = reflection._l(input);
    return f(x);
  },
  bc: (input: Args) => {
    const f = reflection.b_(input);
    const x = reflection.vc(input);
    return f(x);
  },
  br: (input: Args) => {
    const f = reflection.b_(input);
    const x = reflection._r(input);
    return f(x);
  },
  tl: (input: Args) => {
    const f = reflection.t_(input);
    const x = reflection._l(input);
    return f(x);
  },
  tc: (input: Args) => {
    const f = reflection.t_(input);
    const x = reflection.vc(input);
    return f(x);
  },
  tr: (input: Args) => {
    const f = reflection.t_(input);
    const x = reflection._r(input);
    return f(x);
  },
  rt: (input: Args) => {
    const f = reflection.r_(input);
    const y = reflection._t(input);
    return f(y);
  },
  rc: (input: Args) => {
    const f = reflection.r_(input);
    const y = reflection.hc(input);
    return f(y);
  },
  rb: (input: Args) => {
    const f = reflection.r_(input);
    const y = reflection._b(input);
    return f(y);
  },
  lt: (input: Args) => {
    const f = reflection.l_(input);
    const y = reflection._t(input);
    return f(y);
  },
  lc: (input: Args) => {
    const f = reflection.l_(input);
    const y = reflection.hc(input);
    return f(y);
  },
  lb: (input: Args) => {
    const f = reflection.l_(input);
    const y = reflection._b(input);
    return f(y);
  },
};
