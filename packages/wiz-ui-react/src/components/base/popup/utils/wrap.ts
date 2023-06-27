import { DirectionValue } from "../types/direction";

import { createDirectionValue } from "./direction-value";

export type Args = {
  bound: { width: number; height: number };
  content: DOMRect;
  anchor: DOMRect;
  gap: number;
  window: {
    scrollX: number;
    scrollY: number;
  };
};

export const popupContentIsOutOfBoundary = {
  top: ({ anchor, content, window, gap }: Args) =>
    anchor.y - content.height + window.scrollY - gap < 0,
  bottom: ({ bound, anchor, content, window, gap }: Args) =>
    bound.height <
    anchor.y + anchor.height + content.height + window.scrollY + gap,
  left: ({ anchor, content, window, gap }: Args) =>
    anchor.x - content.width + window.scrollX - gap < 0,
  right: ({ bound, anchor, content, window, gap }: Args) =>
    bound.width <
    anchor.x + anchor.width + content.width + window.scrollX + gap,
  rightOnVertical: ({ bound, anchor, content, window }: Args) =>
    bound.width < anchor.x + content.width + window.scrollX,
  leftOnVertical: ({ anchor, content, window }: Args) =>
    anchor.x + anchor.width - content.width + window.scrollX < 0,
  topOnHorizontal: ({ anchor, content, window }: Args) =>
    anchor.y + anchor.height - content.height + window.scrollY < 0,
  bottomOnHorizontal: ({ bound, anchor, content, window }: Args) =>
    bound.height < anchor.y + content.height + window.scrollY,
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
  top_: (args: Args) => {
    const v = popupContentIsOutOfBoundary.top(args) ? "bottom" : "top";
    return (h: "Left" | "Center" | "Right") =>
      createDirectionValue({ first: v, second: h });
  },
  bottom_: (args: Args) => {
    const v = popupContentIsOutOfBoundary.bottom(args) ? "top" : "bottom";
    return (h: "Left" | "Center" | "Right") =>
      createDirectionValue({ first: v, second: h });
  },
  right_: (args: Args) => {
    const h = popupContentIsOutOfBoundary.right(args) ? "left" : "right";
    return (v: "Top" | "Center" | "Bottom") =>
      createDirectionValue({ first: h, second: v });
  },

  left_: (args: Args) => {
    const h = popupContentIsOutOfBoundary.left(args) ? "right" : "left";
    return (v: "Top" | "Center" | "Bottom") =>
      createDirectionValue({ first: h, second: v });
  },
  _Left: (args: Args) =>
    popupContentIsOutOfBoundary.rightOnVertical(args) ? "Right" : "Left",
  _Right: (args: Args) =>
    popupContentIsOutOfBoundary.leftOnVertical(args) ? "Left" : "Right",
  _Top: (args: Args) =>
    popupContentIsOutOfBoundary.bottomOnHorizontal(args) ? "Bottom" : "Top",
  _Bottom: (args: Args) =>
    popupContentIsOutOfBoundary.topOnHorizontal(args) ? "Top" : "Bottom",
  horizontalCenter: (args: Args) => {
    const r =
      popupContentIsOutOfBoundary.rightOnHorizontalCenter(args) && "Right";
    const l =
      popupContentIsOutOfBoundary.leftOnHorizontalCenter(args) && "Left";
    return l || r || "Center";
  },
  verticalCenter: (args: Args) => {
    const b =
      popupContentIsOutOfBoundary.bottomOnVerticalCenter(args) && "Bottom";
    const t = popupContentIsOutOfBoundary.topOnVerticalCenter(args) && "Top";
    return t || b || "Center";
  },
};

export const wrapDirection: Record<
  DirectionValue,
  (args: Args) => DirectionValue
> = {
  bottomLeft: (args: Args) => {
    const f = reflection.bottom_(args);
    const x = reflection._Left(args);
    return f(x);
  },
  bottomCenter: (args: Args) => {
    const f = reflection.bottom_(args);
    const x = reflection.horizontalCenter(args);
    return f(x);
  },
  bottomRight: (args: Args) => {
    const f = reflection.bottom_(args);
    const x = reflection._Right(args);
    return f(x);
  },
  topLeft: (args: Args) => {
    const f = reflection.top_(args);
    const x = reflection._Left(args);
    return f(x);
  },
  topCenter: (args: Args) => {
    const f = reflection.top_(args);
    const x = reflection.horizontalCenter(args);
    return f(x);
  },
  topRight: (args: Args) => {
    const f = reflection.top_(args);
    const x = reflection._Right(args);
    return f(x);
  },
  rightTop: (args: Args) => {
    const f = reflection.right_(args);
    const y = reflection._Top(args);
    return f(y);
  },
  rightCenter: (args: Args) => {
    const f = reflection.right_(args);
    const y = reflection.verticalCenter(args);
    return f(y);
  },
  rightBottom: (args: Args) => {
    const f = reflection.right_(args);
    const y = reflection._Bottom(args);
    return f(y);
  },
  leftTop: (args: Args) => {
    const f = reflection.left_(args);
    const y = reflection._Top(args);
    return f(y);
  },
  leftCenter: (args: Args) => {
    const f = reflection.left_(args);
    const y = reflection.verticalCenter(args);
    return f(y);
  },
  leftBottom: (args: Args) => {
    const f = reflection.left_(args);
    const y = reflection._Bottom(args);
    return f(y);
  },
};

/**
 * 境界外にPopupContentが出てしまう場合、回り込みにより方向を変更します。ただし、変更後も境界外に出てしまう場合は変更しません。
 */
export const wrapOutOfBound = (
  dir: DirectionValue,
  placementArgs: {
    bound: { width: number; height: number };
    content: DOMRect;
    anchor: DOMRect;
    gap: number;
    window: { scrollX: number; scrollY: number };
  }
) => {
  const wrappedDir = wrapDirection[dir](placementArgs);
  const wrappedDir2 = wrapDirection[wrappedDir](placementArgs);
  return wrappedDir !== wrappedDir2 ? dir : wrappedDir;
};
