import { describe, it, expect } from "vitest";

import { wrapDirection, Args } from "../utils/wrap";

describe("Popup Wrapping", () => {
  it("popupが境界内に存在するとき、回り込みロジックは発火しません。", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 10, y: 10, width: 20, height: 20 } as DOMRect,
      anchor: { x: 50, y: 50, width: 30, height: 30 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("bl");
    expect(wrapDirection.bc(input)).toBe("bc");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("tl");
    expect(wrapDirection.tc(input)).toBe("tc");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("lt");
    expect(wrapDirection.lc(input)).toBe("lc");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("rt");
    expect(wrapDirection.rc(input)).toBe("rc");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 左上", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 5, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("bl");
    expect(wrapDirection.bc(input)).toBe("bc");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("bl");
    expect(wrapDirection.tc(input)).toBe("bc");
    expect(wrapDirection.tr(input)).toBe("br");
    expect(wrapDirection.lt(input)).toBe("rt");
    expect(wrapDirection.lc(input)).toBe("rc");
    expect(wrapDirection.lb(input)).toBe("rb");
    expect(wrapDirection.rt(input)).toBe("rt");
    expect(wrapDirection.rc(input)).toBe("rc");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 左", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 50, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("bl");
    expect(wrapDirection.bc(input)).toBe("bc");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("tl");
    expect(wrapDirection.tc(input)).toBe("tc");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("rt");
    expect(wrapDirection.lc(input)).toBe("rc");
    expect(wrapDirection.lb(input)).toBe("rb");
    expect(wrapDirection.rt(input)).toBe("rt");
    expect(wrapDirection.rc(input)).toBe("rc");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 左下", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 95, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("tl");
    expect(wrapDirection.bc(input)).toBe("tc");
    expect(wrapDirection.br(input)).toBe("tr");
    expect(wrapDirection.tl(input)).toBe("tl");
    expect(wrapDirection.tc(input)).toBe("tc");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("rb");
    expect(wrapDirection.lc(input)).toBe("rb");
    expect(wrapDirection.lb(input)).toBe("rb");
    expect(wrapDirection.rt(input)).toBe("rb");
    expect(wrapDirection.rc(input)).toBe("rb");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 上", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 50, y: 5, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("bl");
    expect(wrapDirection.bc(input)).toBe("bc");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("bl");
    expect(wrapDirection.tc(input)).toBe("bc");
    expect(wrapDirection.tr(input)).toBe("br");
    expect(wrapDirection.lt(input)).toBe("lt");
    expect(wrapDirection.lc(input)).toBe("lc");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("rt");
    expect(wrapDirection.rc(input)).toBe("rc");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 下", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 50, y: 95, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("tl");
    expect(wrapDirection.bc(input)).toBe("tc");
    expect(wrapDirection.br(input)).toBe("tr");
    expect(wrapDirection.tl(input)).toBe("tl");
    expect(wrapDirection.tc(input)).toBe("tc");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("lb");
    expect(wrapDirection.lc(input)).toBe("lb");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("rb");
    expect(wrapDirection.rc(input)).toBe("rb");
    expect(wrapDirection.rb(input)).toBe("rb");
  });

  it("Anchor: 右上", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 5, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("br");
    expect(wrapDirection.bc(input)).toBe("br");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("br");
    expect(wrapDirection.tc(input)).toBe("br");
    expect(wrapDirection.tr(input)).toBe("br");
    expect(wrapDirection.lt(input)).toBe("lt");
    expect(wrapDirection.lc(input)).toBe("lc");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("lt");
    expect(wrapDirection.rc(input)).toBe("lc");
    expect(wrapDirection.rb(input)).toBe("lb");
  });

  it("Anchor: 右", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 50, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("br");
    expect(wrapDirection.bc(input)).toBe("br");
    expect(wrapDirection.br(input)).toBe("br");
    expect(wrapDirection.tl(input)).toBe("tr");
    expect(wrapDirection.tc(input)).toBe("tr");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("lt");
    expect(wrapDirection.lc(input)).toBe("lc");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("lt");
    expect(wrapDirection.rc(input)).toBe("lc");
    expect(wrapDirection.rb(input)).toBe("lb");
  });

  it("Anchor: 右下", () => {
    const input: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 95, width: 10, height: 10 } as DOMRect,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bl(input)).toBe("tr");
    expect(wrapDirection.bc(input)).toBe("tr");
    expect(wrapDirection.br(input)).toBe("tr");
    expect(wrapDirection.tl(input)).toBe("tr");
    expect(wrapDirection.tc(input)).toBe("tr");
    expect(wrapDirection.tr(input)).toBe("tr");
    expect(wrapDirection.lt(input)).toBe("lb");
    expect(wrapDirection.lc(input)).toBe("lb");
    expect(wrapDirection.lb(input)).toBe("lb");
    expect(wrapDirection.rt(input)).toBe("lb");
    expect(wrapDirection.rc(input)).toBe("lb");
    expect(wrapDirection.rb(input)).toBe("lb");
  });
});
