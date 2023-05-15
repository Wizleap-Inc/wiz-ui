import { describe, expect, it } from "vitest";

import { getSteppedMinute } from "../components/time";

describe("time", () => {
  it("getSteppedMinute", () => {
    expect(getSteppedMinute(-1, 4)).toBe(0);
    expect(getSteppedMinute(0, 4)).toBe(0);
    expect(getSteppedMinute(1, 4)).toBe(0);

    expect(getSteppedMinute(14, 4)).toBe(0);
    expect(getSteppedMinute(15, 4)).toBe(15);
    expect(getSteppedMinute(16, 4)).toBe(15);

    expect(getSteppedMinute(29, 4)).toBe(15);
    expect(getSteppedMinute(30, 4)).toBe(30);
    expect(getSteppedMinute(31, 4)).toBe(30);

    expect(getSteppedMinute(44, 4)).toBe(30);
    expect(getSteppedMinute(45, 4)).toBe(45);
    expect(getSteppedMinute(46, 4)).toBe(45);

    expect(getSteppedMinute(59, 4)).toBe(45);
    expect(getSteppedMinute(60, 4)).toBe(0);
    expect(getSteppedMinute(61, 4)).toBe(0);
  });
});
