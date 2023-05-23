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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("topLeft");
    expect(wrapDirection.topCenter(input)).toBe("topCenter");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("leftTop");
    expect(wrapDirection.leftCenter(input)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightTop");
    expect(wrapDirection.rightCenter(input)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.topCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.topRight(input)).toBe("bottomRight");
    expect(wrapDirection.leftTop(input)).toBe("rightTop");
    expect(wrapDirection.leftCenter(input)).toBe("rightCenter");
    expect(wrapDirection.leftBottom(input)).toBe("rightBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightTop");
    expect(wrapDirection.rightCenter(input)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("topLeft");
    expect(wrapDirection.topCenter(input)).toBe("topCenter");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("rightTop");
    expect(wrapDirection.leftCenter(input)).toBe("rightCenter");
    expect(wrapDirection.leftBottom(input)).toBe("rightBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightTop");
    expect(wrapDirection.rightCenter(input)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("topLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("topCenter");
    expect(wrapDirection.bottomRight(input)).toBe("topRight");
    expect(wrapDirection.topLeft(input)).toBe("topLeft");
    expect(wrapDirection.topCenter(input)).toBe("topCenter");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("rightBottom");
    expect(wrapDirection.leftCenter(input)).toBe("rightBottom");
    expect(wrapDirection.leftBottom(input)).toBe("rightBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightBottom");
    expect(wrapDirection.rightCenter(input)).toBe("rightBottom");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("bottomLeft");
    expect(wrapDirection.topCenter(input)).toBe("bottomCenter");
    expect(wrapDirection.topRight(input)).toBe("bottomRight");
    expect(wrapDirection.leftTop(input)).toBe("leftTop");
    expect(wrapDirection.leftCenter(input)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightTop");
    expect(wrapDirection.rightCenter(input)).toBe("rightCenter");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("topLeft");
    expect(wrapDirection.bottomCenter(input)).toBe("topCenter");
    expect(wrapDirection.bottomRight(input)).toBe("topRight");
    expect(wrapDirection.topLeft(input)).toBe("topLeft");
    expect(wrapDirection.topCenter(input)).toBe("topCenter");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("leftBottom");
    expect(wrapDirection.leftCenter(input)).toBe("leftBottom");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("rightBottom");
    expect(wrapDirection.rightCenter(input)).toBe("rightBottom");
    expect(wrapDirection.rightBottom(input)).toBe("rightBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomRight");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomRight");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("bottomRight");
    expect(wrapDirection.topCenter(input)).toBe("bottomRight");
    expect(wrapDirection.topRight(input)).toBe("bottomRight");
    expect(wrapDirection.leftTop(input)).toBe("leftTop");
    expect(wrapDirection.leftCenter(input)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("leftTop");
    expect(wrapDirection.rightCenter(input)).toBe("leftCenter");
    expect(wrapDirection.rightBottom(input)).toBe("leftBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("bottomRight");
    expect(wrapDirection.bottomCenter(input)).toBe("bottomRight");
    expect(wrapDirection.bottomRight(input)).toBe("bottomRight");
    expect(wrapDirection.topLeft(input)).toBe("topRight");
    expect(wrapDirection.topCenter(input)).toBe("topRight");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("leftTop");
    expect(wrapDirection.leftCenter(input)).toBe("leftCenter");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("leftTop");
    expect(wrapDirection.rightCenter(input)).toBe("leftCenter");
    expect(wrapDirection.rightBottom(input)).toBe("leftBottom");
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
    expect(wrapDirection.bottomLeft(input)).toBe("topRight");
    expect(wrapDirection.bottomCenter(input)).toBe("topRight");
    expect(wrapDirection.bottomRight(input)).toBe("topRight");
    expect(wrapDirection.topLeft(input)).toBe("topRight");
    expect(wrapDirection.topCenter(input)).toBe("topRight");
    expect(wrapDirection.topRight(input)).toBe("topRight");
    expect(wrapDirection.leftTop(input)).toBe("leftBottom");
    expect(wrapDirection.leftCenter(input)).toBe("leftBottom");
    expect(wrapDirection.leftBottom(input)).toBe("leftBottom");
    expect(wrapDirection.rightTop(input)).toBe("leftBottom");
    expect(wrapDirection.rightCenter(input)).toBe("leftBottom");
    expect(wrapDirection.rightBottom(input)).toBe("leftBottom");
  });
});
