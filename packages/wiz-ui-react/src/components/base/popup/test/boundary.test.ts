import { describe, it, expect } from "vitest";

import { isOutOfBound, Args } from "../utils/wrap";

describe("isOutOfBound", () => {
  const input: Args = {
    bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
    content: { x: 10, y: 10, width: 20, height: 20 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("popupが境界内に存在するとき。", () => {
    expect(isOutOfBound.top(input)).toBe(false);
    expect(isOutOfBound.bottom(input)).toBe(false);
    expect(isOutOfBound.left(input)).toBe(false);
    expect(isOutOfBound.right(input)).toBe(false);
    expect(isOutOfBound.rightOnVertical(input)).toBe(false);
    expect(isOutOfBound.leftOnVertical(input)).toBe(false);
    expect(isOutOfBound.topOnHorizontal(input)).toBe(false);
    expect(isOutOfBound.bottomOnHorizontal(input)).toBe(false);
    expect(isOutOfBound.leftOnHorizontalCenter(input)).toBe(false);
    expect(isOutOfBound.rightOnHorizontalCenter(input)).toBe(false);
    expect(isOutOfBound.topOnVerticalCenter(input)).toBe(false);
    expect(isOutOfBound.bottomOnVerticalCenter(input)).toBe(false);
  });

  const outOfBoundInput: Args = {
    bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
    content: { x: 10, y: 10, width: 200, height: 200 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("popupが境界外に存在するとき。", () => {
    expect(isOutOfBound.top(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.bottom(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.left(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.right(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.rightOnVertical(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.leftOnVertical(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.topOnHorizontal(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.bottomOnHorizontal(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.leftOnHorizontalCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.rightOnHorizontalCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.topOnVerticalCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.bottomOnVerticalCenter(outOfBoundInput)).toBe(true);
  });
});
