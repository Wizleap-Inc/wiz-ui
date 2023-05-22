import { DirectionValues, createDirectionValue } from "../types/direction";

type Input = {
  bound: DOMRect;
  content: DOMRect;
  anchor: DOMRect;
  window: {
    scrollX: number;
    scrollY: number;
  };
};

const isOutOfBound = {
  top: ({ anchor, content, window }: Input) =>
    anchor.y - content.height + window.scrollY < 0,
  bottom: ({ bound, anchor, content, window }: Input) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  left: ({ anchor, content, window }: Input) =>
    anchor.x - content.width + window.scrollX < 0,
  right: ({ bound, anchor, content, window }: Input) =>
    bound.width < anchor.x + anchor.width + content.width + window.scrollX,
  rightOnV: ({ bound, anchor, content, window }: Input) =>
    bound.width < anchor.x + content.width + window.scrollX,
  leftOnV: ({ anchor, content, window }: Input) =>
    anchor.x + anchor.width - content.width + window.scrollX < 0,
  topOnH: ({ anchor, content, window }: Input) =>
    anchor.y + anchor.height - content.height + window.scrollY < 0,
  bottomOnH: ({ bound, anchor, content, window }: Input) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  leftOnHCenter: ({ anchor, content, window }: Input) =>
    anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0,
  rightOnHCenter: ({ bound, anchor, content, window }: Input) =>
    bound.width <
    anchor.x + (anchor.width + content.width) / 2 + window.scrollX,
  topOnVCenter: ({ anchor, content, window }: Input) =>
    anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0,
  bottomOnVCenter: ({ bound, anchor, content, window }: Input) =>
    bound.height <
    anchor.y + (anchor.width + content.height) / 2 + window.scrollY,
};

const reflection = {
  t_: (input: Input) => {
    const v = isOutOfBound.top(input) ? "b" : "t";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  b_: (input: Input) => {
    const v = isOutOfBound.bottom(input) ? "t" : "b";
    return (h: "l" | "c" | "r") =>
      createDirectionValue({ first: v, second: h });
  },
  r_: (input: Input) => {
    const h = isOutOfBound.right(input) ? "l" : "r";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },

  l_: (input: Input) => {
    const h = isOutOfBound.left(input) ? "r" : "l";
    return (v: "t" | "c" | "b") =>
      createDirectionValue({ first: h, second: v });
  },
  _l: (input: Input) => (isOutOfBound.rightOnV(input) ? "r" : "l"),
  _r: (input: Input) => (isOutOfBound.leftOnV(input) ? "l" : "r"),
  _t: (input: Input) => (isOutOfBound.bottomOnH(input) ? "b" : "t"),
  _b: (input: Input) => (isOutOfBound.topOnH(input) ? "t" : "b"),
  vc: (input: Input) => {
    const r = isOutOfBound.rightOnHCenter(input) && "r";
    const l = isOutOfBound.leftOnHCenter(input) && "l";
    return l || r || "c";
  },
  hc: (input: Input) => {
    const b = isOutOfBound.bottomOnVCenter(input) && "b";
    const t = isOutOfBound.topOnVCenter(input) && "t";
    return t || b || "c";
  },
};

export const wrapDirection: Record<
  DirectionValues,
  (input: Input) => DirectionValues
> = {
  bl: (input: Input) => {
    const f = reflection.b_(input);
    const x = reflection._l(input);
    return f(x);
  },
  bc: (input: Input) => {
    const f = reflection.b_(input);
    const x = reflection.vc(input);
    return f(x);
  },
  br: (input: Input) => {
    const f = reflection.b_(input);
    const x = reflection._r(input);
    return f(x);
  },
  tl: (input: Input) => {
    const f = reflection.t_(input);
    const x = reflection._l(input);
    return f(x);
  },
  tc: (input: Input) => {
    const f = reflection.t_(input);
    const x = reflection.vc(input);
    return f(x);
  },
  tr: (input: Input) => {
    const f = reflection.t_(input);
    const x = reflection._r(input);
    return f(x);
  },
  rt: (input: Input) => {
    const f = reflection.r_(input);
    const y = reflection._t(input);
    return f(y);
  },
  rc: (input: Input) => {
    const f = reflection.r_(input);
    const y = reflection.hc(input);
    return f(y);
  },
  rb: (input: Input) => {
    const f = reflection.r_(input);
    const y = reflection._b(input);
    return f(y);
  },
  lt: (input: Input) => {
    const f = reflection.l_(input);
    const y = reflection._t(input);
    return f(y);
  },
  lc: (input: Input) => {
    const f = reflection.l_(input);
    const y = reflection.hc(input);
    return f(y);
  },
  lb: (input: Input) => {
    const f = reflection.l_(input);
    const y = reflection._b(input);
    return f(y);
  },
};
