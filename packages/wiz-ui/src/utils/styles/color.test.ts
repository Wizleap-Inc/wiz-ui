import { describe, it, expect } from "vitest";

import { getColorCss } from "./color";

describe("Color/Styles/Utils", () => {
  it("getColor", () => {
    const input = "green.800";
    const output = "#3DB783";
    expect(getColorCss(input)).toEqual(output);
  });
});
