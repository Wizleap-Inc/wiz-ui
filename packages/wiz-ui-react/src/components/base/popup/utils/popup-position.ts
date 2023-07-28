import { DirectionKey } from "../types/direction";

type Direction = "top" | "bottom" | "left" | "right";
type SecondaryDirection = Direction | "center";
type DirectionSet = {
  primary: Direction;
  secondary: SecondaryDirection;
};
type Size = { width: number; height: number };
type Position = { x: number; y: number };
type Rect = Size & {
  [key in Direction]: number;
};

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
  return {
    ...popupSize,
    top: y + scroll.y,
    right: x + popupSize.width + scroll.x,
    bottom: y + popupSize.height + scroll.y,
    left: x + scroll.x,
  };
}

/**
 * 必要に応じてポップアップの回り込みを一度だけ行う
 */
function wrapPopupDirectionOnce({
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
 * 必要に応じてポップアップの回り込みを行う。
 * 回り込んだ場合で、回り込んだ先にも十分なスペースがない場合は元の方向を返す。
 */
export function wrapPopupDirection({
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
  const wrappedDirectionSet = wrapPopupDirectionOnce({
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
  const rewrappedDIrectionSet = wrapPopupDirectionOnce({
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
 * ポップアップの回り込みを考慮した位置のスタイルを返す
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
    : wrapPopupDirection({
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
