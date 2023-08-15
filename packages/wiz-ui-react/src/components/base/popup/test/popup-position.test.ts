import { describe, expect, it } from "vitest";

import { getPopupPosition, Rect } from "../utils";

type Args = Parameters<typeof getPopupPosition>[0];

const testHelper = (args: Omit<Args, "directionKey">) => {
  const { screenSize, anchorRect, popupSize, gap, scroll } = args;
  const popupPosition = {
    top: {
      primary: {
        top: anchorRect.top - popupSize.height - gap + scroll.y,
        bottom: anchorRect.bottom + gap + scroll.y,
      },
      secondary: {
        top: anchorRect.top + scroll.y,
        bottom: anchorRect.bottom - popupSize.height + scroll.y,
        center:
          anchorRect.top +
          (anchorRect.height - popupSize.height) / 2 +
          scroll.y,
      },
    },
    left: {
      primary: {
        left: anchorRect.left - popupSize.width - gap + scroll.x,
        right: anchorRect.right + gap + scroll.x,
      },
      secondary: {
        left: anchorRect.left + scroll.x,
        right: anchorRect.right - popupSize.width + scroll.x,
        center:
          anchorRect.left + (anchorRect.width - popupSize.width) / 2 + scroll.x,
      },
    },
  };
  return {
    args: (directionKey: Args["directionKey"]): Args => ({
      screenSize,
      anchorRect,
      popupSize,
      gap,
      scroll,
      directionKey,
    }),
    expected: {
      topLeft: {
        top: popupPosition.top.primary.top,
        left: popupPosition.left.secondary.left,
      },
      top: {
        top: popupPosition.top.primary.top,
        left: popupPosition.left.secondary.center,
      },
      topRight: {
        top: popupPosition.top.primary.top,
        left: popupPosition.left.secondary.right,
      },
      bottomLeft: {
        top: popupPosition.top.primary.bottom,
        left: popupPosition.left.secondary.left,
      },
      bottom: {
        top: popupPosition.top.primary.bottom,
        left: popupPosition.left.secondary.center,
      },
      bottomRight: {
        top: popupPosition.top.primary.bottom,
        left: popupPosition.left.secondary.right,
      },
      leftTop: {
        top: popupPosition.top.secondary.top,
        left: popupPosition.left.primary.left,
      },
      left: {
        top: popupPosition.top.secondary.center,
        left: popupPosition.left.primary.left,
      },
      leftBottom: {
        top: popupPosition.top.secondary.bottom,
        left: popupPosition.left.primary.left,
      },
      rightTop: {
        top: popupPosition.top.secondary.top,
        left: popupPosition.left.primary.right,
      },
      right: {
        top: popupPosition.top.secondary.center,
        left: popupPosition.left.primary.right,
      },
      rightBottom: {
        top: popupPosition.top.secondary.bottom,
        left: popupPosition.left.primary.right,
      },
    },
  };
};

describe("popup-position", () => {
  describe("getPopupPosition", () => {
    it("popupが画面内に存在するとき、指定通りの方向の座標が得られること", () => {
      const { args, expected } = testHelper({
        screenSize: {
          width: 1000,
          height: 1001,
        },
        anchorRect: new Rect(500, 502, 10, 13),
        popupSize: {
          width: 34,
          height: 30,
        },
        gap: 5,
        scroll: {
          x: 6,
          y: 7,
        },
      });

      expect(getPopupPosition(args("bottomLeft"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("bottom"))).toEqual(expected.bottom);
      expect(getPopupPosition(args("bottomRight"))).toEqual(
        expected.bottomRight
      );
      expect(getPopupPosition(args("topLeft"))).toEqual(expected.topLeft);
      expect(getPopupPosition(args("top"))).toEqual(expected.top);
      expect(getPopupPosition(args("topRight"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("leftTop"))).toEqual(expected.leftTop);
      expect(getPopupPosition(args("left"))).toEqual(expected.left);
      expect(getPopupPosition(args("leftBottom"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("rightTop"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("right"))).toEqual(expected.right);
      expect(getPopupPosition(args("rightBottom"))).toEqual(
        expected.rightBottom
      );
    });

    it("アンカーが画面左上に接しているとき、ポップアップの方向が適切に回り込むこと", () => {
      const { args, expected } = testHelper({
        screenSize: {
          width: 1000,
          height: 1000,
        },
        anchorRect: new Rect(0, 0, 50, 50),
        popupSize: {
          width: 100,
          height: 100,
        },
        gap: 10,
        scroll: {
          x: 0,
          y: 0,
        },
      });

      expect(getPopupPosition(args("bottomLeft"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("bottom"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("bottomRight"))).toEqual(
        expected.bottomLeft
      );
      expect(getPopupPosition(args("topLeft"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("top"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("topRight"))).toEqual(expected.bottomLeft);
      expect(getPopupPosition(args("leftTop"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("left"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("leftBottom"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("rightTop"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("right"))).toEqual(expected.rightTop);
      expect(getPopupPosition(args("rightBottom"))).toEqual(expected.rightTop);
    });

    it("アンカーが画面右下に接しているとき、ポップアップの方向が適切に回り込むこと", () => {
      const { args, expected } = testHelper({
        screenSize: {
          width: 1000,
          height: 1000,
        },
        anchorRect: new Rect(950, 950, 50, 50),
        popupSize: {
          width: 100,
          height: 100,
        },
        gap: 10,
        scroll: {
          x: 0,
          y: 0,
        },
      });

      expect(getPopupPosition(args("bottomLeft"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("bottom"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("bottomRight"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("topLeft"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("top"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("topRight"))).toEqual(expected.topRight);
      expect(getPopupPosition(args("leftTop"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("left"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("leftBottom"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("rightTop"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("right"))).toEqual(expected.leftBottom);
      expect(getPopupPosition(args("rightBottom"))).toEqual(
        expected.leftBottom
      );
    });
  });
});

// 諦めパターン
