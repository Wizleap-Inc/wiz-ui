import { describe, it, expect } from "vitest";

import { getSpacingCSS } from "./spacing";

describe("Spacing/Styles/Utils", () => {
  it("getSpacing", () => {
    const input = {
      gap: "md",
    };
    const output = {
      gap: "1rem",
    };
    expect(getSpacingCSS(input)).toEqual(output);
  });
});
