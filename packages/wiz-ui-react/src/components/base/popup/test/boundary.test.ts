import { describe, it, expect } from "vitest";

import { isOutOfBound, Input } from "../utils/wrap";

describe("isOutOfBound", () => {
  const input: Input = {
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
    expect(isOutOfBound.rightOnV(input)).toBe(false);
    expect(isOutOfBound.leftOnV(input)).toBe(false);
    expect(isOutOfBound.topOnH(input)).toBe(false);
    expect(isOutOfBound.bottomOnH(input)).toBe(false);
    expect(isOutOfBound.leftOnHCenter(input)).toBe(false);
    expect(isOutOfBound.rightOnHCenter(input)).toBe(false);
    expect(isOutOfBound.topOnVCenter(input)).toBe(false);
    expect(isOutOfBound.bottomOnVCenter(input)).toBe(false);
  });

  const outOfBoundInput: Input = {
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
    expect(isOutOfBound.rightOnV(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.leftOnV(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.topOnH(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.bottomOnH(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.leftOnHCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.rightOnHCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.topOnVCenter(outOfBoundInput)).toBe(true);
    expect(isOutOfBound.bottomOnVCenter(outOfBoundInput)).toBe(true);
  });
});
