import { DirectionKey } from "../types/direction";

type Direction = "top" | "bottom" | "left" | "right";
type SecondaryDirection = Direction | "center";
type DirectionSet = {
  primary: Direction;
  secondary: SecondaryDirection;
};
type Size = { width: number; height: number };
type Position = { x: number; y: number };

import { Rect } from "./rect";

function convertDirectionKeyToDirectionSet(key: DirectionKey): DirectionSet {
  const convertPrimary = (): Direction => {
    if (key.startsWith("top")) return "top";
    if (key.startsWith("left")) return "left";
    if (key.startsWith("right")) return "right";
    return "bottom";
  };
  const convertSecondary = (): SecondaryDirection => {
    if (key.endsWith("Top")) return "top";
    if (key.endsWith("Bottom")) return "bottom";
    if (key.endsWith("Left")) return "left";
    if (key.endsWith("Right")) return "right";
    return "center";
  };
  return {
    primary: convertPrimary(),
    secondary: convertSecondary(),
  };
}

/**
 * 引数の Rect が画面外にはみ出す方向を取得する
 */
function isRectOutOfScreen({
  rect,
  screenSize,
  scroll,
}: {
  rect: Rect;
  screenSize: Size;
  scroll: Position;
}): Record<Direction, boolean> {
  return {
    top: rect.top < scroll.y,
    left: rect.left < scroll.x,
    bottom: rect.bottom > scroll.y + screenSize.height,
    right: rect.right > scroll.x + screenSize.width,
  };
}

/**
 * ポップアップの Rect を算出する
 */
function getPopupRect({
  anchorRect,
  popupSize,
  directionSet,
  gap,
  scroll,
}: {
  anchorRect: Rect;
  popupSize: Size;
  directionSet: DirectionSet;
  gap: number;
  scroll: Position;
}): Rect {
  const x = (() => {
    if (directionSet.primary === "left") {
      return anchorRect.left - popupSize.width - gap;
    }
    if (directionSet.primary === "right") {
      return anchorRect.right + gap;
    }
    if (directionSet.secondary === "right") {
      return anchorRect.right - popupSize.width;
    }
    if (directionSet.secondary === "center") {
      return anchorRect.left + (anchorRect.width - popupSize.width) / 2;
    }
    return anchorRect.left;
  })();
  const y = (() => {
    if (directionSet.primary === "top") {
      return anchorRect.top - popupSize.height - gap;
    }
    if (directionSet.primary === "bottom") {
      return anchorRect.bottom + gap;
    }
    if (directionSet.secondary === "bottom") {
      return anchorRect.bottom - popupSize.height;
    }
    if (directionSet.secondary === "center") {
      return anchorRect.top + (anchorRect.height - popupSize.height) / 2;
    }
    return anchorRect.top;
  })();
  return new Rect(
    x + scroll.x,
    y + scroll.y,
    popupSize.width,
    popupSize.height
  );
}

/**
 * 必要に応じて、ポップアップの表示方向の回り込みを行う
 */
function wrapPopupDirection({
  popupRect,
  directionSet,
  screenSize,
  scroll,
}: {
  popupRect: Rect;
  directionSet: DirectionSet;
  screenSize: Size;
  scroll: Position;
}): DirectionSet {
  const isPopupOutOfScreen = isRectOutOfScreen({
    rect: popupRect,
    screenSize,
    scroll,
  });
  if (
    !isPopupOutOfScreen.top &&
    !isPopupOutOfScreen.bottom &&
    !isPopupOutOfScreen.left &&
    !isPopupOutOfScreen.right
  ) {
    // どこもはみ出さない場合はそのまま返す
    return directionSet;
  }

  const wrapPrimary = (): Direction => {
    if (isPopupOutOfScreen.top && directionSet.primary === "top") {
      return "bottom";
    }
    if (isPopupOutOfScreen.bottom && directionSet.primary === "bottom") {
      return "top";
    }
    if (isPopupOutOfScreen.left && directionSet.primary === "left") {
      return "right";
    }
    if (isPopupOutOfScreen.right && directionSet.primary === "right") {
      return "left";
    }
    return directionSet.primary;
  };

  const wrapSecondary = (): SecondaryDirection => {
    if (directionSet.secondary === "center") {
      switch (directionSet.primary) {
        case "top":
        case "bottom":
          if (isPopupOutOfScreen.left) {
            return "left";
          }
          if (isPopupOutOfScreen.right) {
            return "right";
          }
          break;
        case "left":
        case "right":
          if (isPopupOutOfScreen.top) {
            return "top";
          }
          if (isPopupOutOfScreen.bottom) {
            return "bottom";
          }
          break;
      }
      return "center";
    }
    if (isPopupOutOfScreen.top && directionSet.secondary === "bottom") {
      return "top";
    }
    if (isPopupOutOfScreen.bottom && directionSet.secondary === "top") {
      return "bottom";
    }
    if (isPopupOutOfScreen.left && directionSet.secondary === "right") {
      return "left";
    }
    if (isPopupOutOfScreen.right && directionSet.secondary === "left") {
      return "right";
    }
    return directionSet.secondary;
  };

  return {
    primary: wrapPrimary(),
    secondary: wrapSecondary(),
  };
}

/**
 * ポップアップの表示方向を返す
 */
function getPopupDirection({
  anchorRect,
  popupSize,
  directionSet,
  gap,
  screenSize,
  scroll,
}: {
  anchorRect: Rect;
  popupSize: Size;
  directionSet: DirectionSet;
  gap: number;
  screenSize: Size;
  scroll: Position;
}): DirectionSet {
  const popupRect = getPopupRect({
    anchorRect,
    popupSize,
    directionSet,
    gap,
    scroll,
  });
  const wrappedDirectionSet = wrapPopupDirection({
    popupRect,
    directionSet,
    screenSize,
    scroll,
  });

  if (
    directionSet.primary === wrappedDirectionSet.primary &&
    directionSet.secondary === wrappedDirectionSet.secondary
  ) {
    // 回り込みなし
    return directionSet;
  }

  const wrappedPopupRect = getPopupRect({
    anchorRect,
    popupSize,
    directionSet: wrappedDirectionSet,
    gap,
    scroll,
  });
  const rewrappedDIrectionSet = wrapPopupDirection({
    popupRect: wrappedPopupRect,
    directionSet: wrappedDirectionSet,
    screenSize,
    scroll,
  });
  // 回り込んだ先でもはみ出す場合は元の方向を採用する
  return {
    primary:
      wrappedDirectionSet.primary === rewrappedDIrectionSet.primary
        ? wrappedDirectionSet.primary
        : directionSet.primary,
    secondary:
      wrappedDirectionSet.secondary === rewrappedDIrectionSet.secondary
        ? wrappedDirectionSet.secondary
        : directionSet.secondary,
  };
}

/**
 * 回り込みを考慮したポップアップの位置を返す
 */
export function getPopupPosition({
  anchorRect,
  popupSize,
  directionKey,
  gap,
  screenSize,
  scroll,
  isDirectionFixed,
}: {
  anchorRect: Rect;
  popupSize: Size;
  directionKey: DirectionKey;
  gap: number;
  screenSize: Size;
  scroll: Position;
  isDirectionFixed?: boolean;
}): { top: number; left: number } {
  const directionSet = convertDirectionKeyToDirectionSet(directionKey);
  const determinedDirectionSet = isDirectionFixed
    ? directionSet
    : getPopupDirection({
        anchorRect,
        popupSize,
        directionSet,
        gap,
        screenSize,
        scroll,
      });
  const popupRect = getPopupRect({
    anchorRect,
    popupSize,
    directionSet: determinedDirectionSet,
    gap,
    scroll,
  });
  return {
    top: popupRect.top,
    left: popupRect.left,
  };
}
