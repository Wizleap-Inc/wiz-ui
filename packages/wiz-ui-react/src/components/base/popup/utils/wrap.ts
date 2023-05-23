import { DirectionValue } from "../types/direction";

import { createDirectionValue } from "./direction-value";

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
  rightOnVertical: ({ bound, anchor, content, window }: Args) =>
    bound.width < anchor.x + content.width + window.scrollX,
  leftOnVertical: ({ anchor, content, window }: Args) =>
    anchor.x + anchor.width - content.width + window.scrollX < 0,
  topOnHorizontal: ({ anchor, content, window }: Args) =>
    anchor.y + anchor.height - content.height + window.scrollY < 0,
  bottomOnHorizontal: ({ bound, anchor, content, window }: Args) =>
    bound.height < anchor.y + anchor.height + content.height + window.scrollY,
  leftOnHorizontalCenter: ({ anchor, content, window }: Args) =>
    anchor.x + (anchor.width - content.width) / 2 + window.scrollX < 0,
  rightOnHorizontalCenter: ({ bound, anchor, content, window }: Args) =>
    bound.width <
    anchor.x + (anchor.width + content.width) / 2 + window.scrollX,
  topOnVerticalCenter: ({ anchor, content, window }: Args) =>
    anchor.y + (anchor.height - content.height) / 2 + window.scrollY < 0,
  bottomOnVerticalCenter: ({ bound, anchor, content, window }: Args) =>
    bound.height <
    anchor.y + (anchor.height + content.height) / 2 + window.scrollY,
};

export const reflection = {
  top_: (input: Args) => {
    const v = isOutOfBound.top(input) ? "bottom" : "top";
    return (h: "Left" | "Center" | "Right") =>
      createDirectionValue({ first: v, second: h });
  },
  bottom_: (input: Args) => {
    const v = isOutOfBound.bottom(input) ? "top" : "bottom";
    return (h: "Left" | "Center" | "Right") =>
      createDirectionValue({ first: v, second: h });
  },
  right_: (input: Args) => {
    const h = isOutOfBound.right(input) ? "left" : "right";
    return (v: "Top" | "Center" | "Bottom") =>
      createDirectionValue({ first: h, second: v });
  },

  left_: (input: Args) => {
    const h = isOutOfBound.left(input) ? "right" : "left";
    return (v: "Top" | "Center" | "Bottom") =>
      createDirectionValue({ first: h, second: v });
  },
  _Left: (input: Args) =>
    isOutOfBound.rightOnVertical(input) ? "Right" : "Left",
  _Right: (input: Args) =>
    isOutOfBound.leftOnVertical(input) ? "Left" : "Right",
  _Top: (input: Args) =>
    isOutOfBound.bottomOnHorizontal(input) ? "Bottom" : "Top",
  _Bottom: (input: Args) =>
    isOutOfBound.topOnHorizontal(input) ? "Top" : "Bottom",
  verticalCenter: (input: Args) => {
    const r = isOutOfBound.rightOnHorizontalCenter(input) && "Right";
    const l = isOutOfBound.leftOnHorizontalCenter(input) && "Left";
    return l || r || "Center";
  },
  horizontalCenter: (input: Args) => {
    const b = isOutOfBound.bottomOnVerticalCenter(input) && "Bottom";
    const t = isOutOfBound.topOnVerticalCenter(input) && "Top";
    return t || b || "Center";
  },
};

export const wrapDirection: Record<
  DirectionValue,
  (input: Args) => DirectionValue
> = {
  bottomLeft: (input: Args) => {
    const f = reflection.bottom_(input);
    const x = reflection._Left(input);
    return f(x);
  },
  bottomCenter: (input: Args) => {
    const f = reflection.bottom_(input);
    const x = reflection.verticalCenter(input);
    return f(x);
  },
  bottomRight: (input: Args) => {
    const f = reflection.bottom_(input);
    const x = reflection._Right(input);
    return f(x);
  },
  topLeft: (input: Args) => {
    const f = reflection.top_(input);
    const x = reflection._Left(input);
    return f(x);
  },
  topCenter: (input: Args) => {
    const f = reflection.top_(input);
    const x = reflection.verticalCenter(input);
    return f(x);
  },
  topRight: (input: Args) => {
    const f = reflection.top_(input);
    const x = reflection._Right(input);
    return f(x);
  },
  rightTop: (input: Args) => {
    const f = reflection.right_(input);
    const y = reflection._Top(input);
    return f(y);
  },
  rightCenter: (input: Args) => {
    const f = reflection.right_(input);
    const y = reflection.horizontalCenter(input);
    return f(y);
  },
  rightBottom: (input: Args) => {
    const f = reflection.right_(input);
    const y = reflection._Bottom(input);
    return f(y);
  },
  leftTop: (input: Args) => {
    const f = reflection.left_(input);
    const y = reflection._Top(input);
    return f(y);
  },
  leftCenter: (input: Args) => {
    const f = reflection.left_(input);
    const y = reflection.horizontalCenter(input);
    return f(y);
  },
  leftBottom: (input: Args) => {
    const f = reflection.left_(input);
    const y = reflection._Bottom(input);
    return f(y);
  },
};
