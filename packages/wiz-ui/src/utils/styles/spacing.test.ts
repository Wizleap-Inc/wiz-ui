import { describe, it, expect } from "vitest";

import { getSpacingCSS } from "./spacing";

describe("Spacing/Styles/Utils", () => {
  it("getSpacing", () => {
    const input = "md";
    const output = "1rem";
    expect(getSpacingCSS(input)).toEqual(output);
  });
});
