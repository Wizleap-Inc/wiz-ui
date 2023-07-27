import { describe, it, expect } from "vitest";

import { popupContentIsOutOfBoundary, Args } from "../utils/wrap";

describe("popupContentIsOutOfBoundary", () => {
  const args: Args = {
    bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
    content: { x: 10, y: 10, width: 20, height: 20 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    gap: 0,
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("popupが境界内に存在するとき。", () => {
    expect(popupContentIsOutOfBoundary.top(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.bottom(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.left(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.right(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.rightOnVertical(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.leftOnVertical(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.topOnHorizontal(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.bottomOnHorizontal(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.leftOnHorizontalCenter(args)).toBe(
      false
    );
    expect(popupContentIsOutOfBoundary.rightOnHorizontalCenter(args)).toBe(
      false
    );
    expect(popupContentIsOutOfBoundary.topOnVerticalCenter(args)).toBe(false);
    expect(popupContentIsOutOfBoundary.bottomOnVerticalCenter(args)).toBe(
      false
    );
  });

  const outOfBoundInput: Args = {
    bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
    content: { x: 10, y: 10, width: 200, height: 200 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    gap: 0,
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("popupが境界外に存在するとき。", () => {
    expect(popupContentIsOutOfBoundary.top(outOfBoundInput)).toBe(true);
    expect(popupContentIsOutOfBoundary.bottom(outOfBoundInput)).toBe(true);
    expect(popupContentIsOutOfBoundary.left(outOfBoundInput)).toBe(true);
    expect(popupContentIsOutOfBoundary.right(outOfBoundInput)).toBe(true);
    expect(popupContentIsOutOfBoundary.rightOnVertical(outOfBoundInput)).toBe(
      true
    );
    expect(popupContentIsOutOfBoundary.leftOnVertical(outOfBoundInput)).toBe(
      true
    );
    expect(popupContentIsOutOfBoundary.topOnHorizontal(outOfBoundInput)).toBe(
      true
    );
    expect(
      popupContentIsOutOfBoundary.bottomOnHorizontal(outOfBoundInput)
    ).toBe(true);
    expect(
      popupContentIsOutOfBoundary.leftOnHorizontalCenter(outOfBoundInput)
    ).toBe(true);
    expect(
      popupContentIsOutOfBoundary.rightOnHorizontalCenter(outOfBoundInput)
    ).toBe(true);
    expect(
      popupContentIsOutOfBoundary.topOnVerticalCenter(outOfBoundInput)
    ).toBe(true);
    expect(
      popupContentIsOutOfBoundary.bottomOnVerticalCenter(outOfBoundInput)
    ).toBe(true);
  });
});
