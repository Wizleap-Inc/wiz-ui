import { describe, it, expect } from "vitest";

import { wrapDirection, Args } from "../utils/wrap";

describe("Popup Wrapping", () => {
  it("popupが境界内に存在するとき、回り込みロジックは発火しません。", () => {
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
    expect(wrapDirection.bottomLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("topLeft");
    expect(wrapDirection.topCenter(args)).toBe("topCenter");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("leftTop");
    expect(wrapDirection.leftCenter(args)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightTop");
    expect(wrapDirection.rightCenter(args)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 左上", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 5, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.topCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.topRight(args)).toBe("bottomRight");
    expect(wrapDirection.leftTop(args)).toBe("rightTop");
    expect(wrapDirection.leftCenter(args)).toBe("rightCenter");
    expect(wrapDirection.leftBottom(args)).toBe("rightBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightTop");
    expect(wrapDirection.rightCenter(args)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 左", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 50, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("topLeft");
    expect(wrapDirection.topCenter(args)).toBe("topCenter");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("rightTop");
    expect(wrapDirection.leftCenter(args)).toBe("rightCenter");
    expect(wrapDirection.leftBottom(args)).toBe("rightBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightTop");
    expect(wrapDirection.rightCenter(args)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 左下", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 5, y: 95, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("topLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("topCenter");
    expect(wrapDirection.bottomRight(args)).toBe("topRight");
    expect(wrapDirection.topLeft(args)).toBe("topLeft");
    expect(wrapDirection.topCenter(args)).toBe("topCenter");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("rightBottom");
    expect(wrapDirection.leftCenter(args)).toBe("rightBottom");
    expect(wrapDirection.leftBottom(args)).toBe("rightBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightBottom");
    expect(wrapDirection.rightCenter(args)).toBe("rightBottom");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 上", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 50, y: 5, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("bottomLeft");
    expect(wrapDirection.topCenter(args)).toBe("bottomCenter");
    expect(wrapDirection.topRight(args)).toBe("bottomRight");
    expect(wrapDirection.leftTop(args)).toBe("leftTop");
    expect(wrapDirection.leftCenter(args)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightTop");
    expect(wrapDirection.rightCenter(args)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 下", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 50, y: 95, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("topLeft");
    expect(wrapDirection.bottomCenter(args)).toBe("topCenter");
    expect(wrapDirection.bottomRight(args)).toBe("topRight");
    expect(wrapDirection.topLeft(args)).toBe("topLeft");
    expect(wrapDirection.topCenter(args)).toBe("topCenter");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("leftBottom");
    expect(wrapDirection.leftCenter(args)).toBe("leftBottom");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("rightBottom");
    expect(wrapDirection.rightCenter(args)).toBe("rightBottom");
    expect(wrapDirection.rightBottom(args)).toBe("rightBottom");
  });

  it("Anchor: 右上", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 5, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("bottomRight");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomRight");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("bottomRight");
    expect(wrapDirection.topCenter(args)).toBe("bottomRight");
    expect(wrapDirection.topRight(args)).toBe("bottomRight");
    expect(wrapDirection.leftTop(args)).toBe("leftTop");
    expect(wrapDirection.leftCenter(args)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("leftTop");
    expect(wrapDirection.rightCenter(args)).toBe("leftCenter");
    expect(wrapDirection.rightBottom(args)).toBe("leftBottom");
  });

  it("Anchor: 右", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 50, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("bottomRight");
    expect(wrapDirection.bottomCenter(args)).toBe("bottomRight");
    expect(wrapDirection.bottomRight(args)).toBe("bottomRight");
    expect(wrapDirection.topLeft(args)).toBe("topRight");
    expect(wrapDirection.topCenter(args)).toBe("topRight");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("leftTop");
    expect(wrapDirection.leftCenter(args)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("leftTop");
    expect(wrapDirection.rightCenter(args)).toBe("leftCenter");
    expect(wrapDirection.rightBottom(args)).toBe("leftBottom");
  });

  it("Anchor: 右下", () => {
    const args: Args = {
      bound: { x: 0, y: 0, width: 100, height: 100 } as DOMRect,
      content: { x: 0, y: 0, width: 10, height: 10 } as DOMRect,
      anchor: { x: 95, y: 95, width: 10, height: 10 } as DOMRect,
      gap: 0,
      window: {
        scrollX: 0,
        scrollY: 0,
      },
    };
    expect(wrapDirection.bottomLeft(args)).toBe("topRight");
    expect(wrapDirection.bottomCenter(args)).toBe("topRight");
    expect(wrapDirection.bottomRight(args)).toBe("topRight");
    expect(wrapDirection.topLeft(args)).toBe("topRight");
    expect(wrapDirection.topCenter(args)).toBe("topRight");
    expect(wrapDirection.topRight(args)).toBe("topRight");
    expect(wrapDirection.leftTop(args)).toBe("leftBottom");
    expect(wrapDirection.leftCenter(args)).toBe("leftBottom");
    expect(wrapDirection.leftBottom(args)).toBe("leftBottom");
    expect(wrapDirection.rightTop(args)).toBe("leftBottom");
    expect(wrapDirection.rightCenter(args)).toBe("leftBottom");
    expect(wrapDirection.rightBottom(args)).toBe("leftBottom");
  });
});
