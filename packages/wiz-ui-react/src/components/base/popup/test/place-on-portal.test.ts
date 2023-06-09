import { describe, it, expect } from "vitest";

import { PlacementOption } from "../types/placement";
import { placeOnPortalStyle } from "../utils";

describe("Placement Style (Portal)", () => {
  const args: PlacementOption = {
    content: { x: 10, y: 10, width: 20, height: 20 } as DOMRect,
    anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
    gap: "0rem",
    window: {
      scrollX: 0,
      scrollY: 0,
    },
  };
  it("top-left", () => {
    const style = placeOnPortalStyle.topLeft(args);
    expect(style.top).toBe(args.anchor.y + args.window.scrollY);
    expect(style.left).toBe(args.anchor.x + args.window.scrollX);
    expect(style.transform).toBe(
      `translateY(-100%) translate(0, -${args.gap})`
    );
  });
  it("top", () => {
    const style = placeOnPortalStyle.topCenter(args);
    expect(style.top).toBe(args.anchor.y + args.window.scrollY);
    expect(style.left).toBe(
      args.anchor.x + args.anchor.width / 2 + args.window.scrollX
    );
    expect(style.transform).toBe(
      `translateY(-100%) translateX(-50%) translate(0, -${args.gap})`
    );
  });
  it("top-right", () => {
    const style = placeOnPortalStyle.topRight(args);
    expect(style.top).toBe(args.anchor.y + args.window.scrollY);
    expect(style.left).toBe(
      args.anchor.x + args.anchor.width + args.window.scrollX
    );
    expect(style.transform).toBe(
      `translateY(-100%) translateX(-100%) translate(0, -${args.gap})`
    );
  });
  it("bottom-left", () => {
    const style = placeOnPortalStyle.bottomLeft(args);
    expect(style.top).toBe(
      args.anchor.y + args.anchor.height + args.window.scrollY
    );
    expect(style.left).toBe(args.anchor.x + args.window.scrollX);
    expect(style.transform).toBe(`translate(0, ${args.gap})`);
  });
  it("bottom", () => {
    const style = placeOnPortalStyle.bottomCenter(args);
    expect(style.top).toBe(
      args.anchor.y + args.anchor.height + args.window.scrollY
    );
    expect(style.left).toBe(
      args.anchor.x + args.anchor.width / 2 + args.window.scrollX
    );
    expect(style.transform).toBe(`translateX(-50%) translate(0, ${args.gap})`);
  });
  it("bottom-right", () => {
    const style = placeOnPortalStyle.bottomRight(args);
    expect(style.top).toBe(
      args.anchor.y + args.anchor.height + args.window.scrollY
    );
    expect(style.left).toBe(
      args.anchor.x + args.anchor.width + args.window.scrollX
    );
    expect(style.transform).toBe(`translateX(-100%) translate(0, ${args.gap})`);
  });
  it("left-top", () => {
    const style = placeOnPortalStyle.leftTop(args);
    expect(style.top).toBe(args.anchor.y + args.window.scrollY);
    expect(style.left).toBe(args.anchor.x + args.window.scrollX);
    expect(style.transform).toBe(
      `translateX(-100%) translate(-${args.gap}, 0)`
    );
  });
  it("left", () => {
    const style = placeOnPortalStyle.leftCenter(args);
    expect(style.top).toBe(
      args.anchor.y + args.anchor.height / 2 + args.window.scrollY
    );

    expect(style.left).toBe(args.anchor.x + args.window.scrollX);
    expect(style.transform).toBe(
      `translate(-100%, -50%) translate(-${args.gap}, 0)`
    );
  });
  it("left-bottom", () => {
    const style = placeOnPortalStyle.leftBottom(args);
    expect(style.top).toBe(
      args.anchor.y + args.anchor.height + args.window.scrollY
    );
    expect(style.left).toBe(args.anchor.x + args.window.scrollX);
    expect(style.transform).toBe(
      `translate(-100%, -100%) translate(-${args.gap}, 0)`
    );
  });
});
