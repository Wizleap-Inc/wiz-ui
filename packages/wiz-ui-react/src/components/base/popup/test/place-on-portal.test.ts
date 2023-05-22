import { describe, it, expect } from "vitest";

import { PlacementOption } from "../types/placement";
import { placeOnPortalStyle } from "../utils";

describe("Placement Style (Portal)", () => {
  const input: PlacementOption = {
    content: { x: 10, y: 10, width: 20, height: 20 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    gap: "0rem",
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("top-left", () => {
    const style = placeOnPortalStyle.tl(input);
    expect(style.top).toBe(input.anchor.y + input.window.scrollY);
    expect(style.left).toBe(input.anchor.x + input.window.scrollX);
    expect(style.transform).toBe(
      `translateY(-100%) translate(0, -${input.gap})`
    );
  });
  it("top", () => {
    const style = placeOnPortalStyle.tc(input);
    expect(style.top).toBe(input.anchor.y + input.window.scrollY);
    expect(style.left).toBe(
      input.anchor.x + input.anchor.width / 2 + input.window.scrollX
    );
    expect(style.transform).toBe(
      `translateY(-100%) translateX(-50%) translate(0, -${input.gap})`
    );
  });
  it("top-right", () => {
    const style = placeOnPortalStyle.tr(input);
    expect(style.top).toBe(input.anchor.y + input.window.scrollY);
    expect(style.left).toBe(
      input.anchor.x + input.anchor.width + input.window.scrollX
    );
    expect(style.transform).toBe(
      `translateY(-100%) translateX(-100%) translate(0, -${input.gap})`
    );
  });
  it("bottom-left", () => {
    const style = placeOnPortalStyle.bl(input);
    expect(style.top).toBe(
      input.anchor.y + input.anchor.height + input.window.scrollY
    );
    expect(style.left).toBe(input.anchor.x + input.window.scrollX);
    expect(style.transform).toBe(`translate(0, ${input.gap})`);
  });
  it("bottom", () => {
    const style = placeOnPortalStyle.bc(input);
    expect(style.top).toBe(
      input.anchor.y + input.anchor.height + input.window.scrollY
    );
    expect(style.left).toBe(
      input.anchor.x + input.anchor.width / 2 + input.window.scrollX
    );
    expect(style.transform).toBe(`translateX(-50%) translate(0, ${input.gap})`);
  });
  it("bottom-right", () => {
    const style = placeOnPortalStyle.br(input);
    expect(style.top).toBe(
      input.anchor.y + input.anchor.height + input.window.scrollY
    );
    expect(style.left).toBe(
      input.anchor.x + input.anchor.width + input.window.scrollX
    );
    expect(style.transform).toBe(
      `translateX(-100%) translate(0, ${input.gap})`
    );
  });
  it("left-top", () => {
    const style = placeOnPortalStyle.lt(input);
    expect(style.top).toBe(input.anchor.y + input.window.scrollY);
    expect(style.left).toBe(input.anchor.x + input.window.scrollX);
    expect(style.transform).toBe(
      `translateX(-100%) translate(0, -${input.gap})`
    );
  });
  it("left", () => {
    const style = placeOnPortalStyle.lc(input);
    expect(style.top).toBe(
      input.anchor.y + input.anchor.height / 2 + input.window.scrollY
    );

    expect(style.left).toBe(input.anchor.x + input.window.scrollX);
    expect(style.transform).toBe(
      `translate(-100%, -50%) translate(0, -${input.gap})`
    );
  });
  it("left-bottom", () => {
    const style = placeOnPortalStyle.lb(input);
    expect(style.top).toBe(
      input.anchor.y + input.anchor.height + input.window.scrollY
    );
    expect(style.left).toBe(input.anchor.x + input.window.scrollX);
    expect(style.transform).toBe(
      `translate(-100%, -100%) translate(0, -${input.gap})`
    );
  });
});
