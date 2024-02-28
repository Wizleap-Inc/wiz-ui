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

export class Popup {
  private readonly anchorRect: Rect;
  private readonly popupSize: Size;
  private readonly gap: number;
  private readonly screenSize: Size;
  private readonly scroll: Position;
  private readonly isDirectionFixed: boolean;

  constructor(args: {
    anchorRect: Rect;
    popupSize: Size;
    gap: number;
    screenSize: Size;
    scroll: Position;
    isDirectionFixed?: boolean;
    visualViewport?: { offsetTop: number; offsetLeft: number } | null;
  }) {
    this.anchorRect = new Rect(
      args.anchorRect.x + (args.visualViewport?.offsetLeft ?? 0),
      args.anchorRect.y + (args.visualViewport?.offsetTop ?? 0),
      args.anchorRect.width,
      args.anchorRect.height
    );
    this.popupSize = args.popupSize;
    this.gap = args.gap;
    this.screenSize = args.screenSize;
    this.scroll = args.scroll;
    this.isDirectionFixed = args.isDirectionFixed ?? false;
  }

  getPosition(directionKey: DirectionKey) {
    const directionSet = this.convertDirectionKeyToDirectionSet(directionKey);
    const wrappedDirectionSet = this.getPopupDirection(directionSet);
    const popupRect = this.getPopupRect(wrappedDirectionSet);
    return {
      top: Math.round(popupRect.top),
      left: Math.round(popupRect.left),
    };
  }

  private convertDirectionKeyToDirectionSet(key: DirectionKey): DirectionSet {
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

  protected getPopupDirection(directionSet: DirectionSet): DirectionSet {
    if (this.isDirectionFixed) {
      return directionSet;
    }

    const wrappedDirectionSet = this.wrapPopupDirection(directionSet);
    if (
      directionSet.primary === wrappedDirectionSet.primary &&
      directionSet.secondary === wrappedDirectionSet.secondary
    ) {
      // 回り込みなし
      return directionSet;
    }

    const rewrappedDIrectionSet = this.wrapPopupDirection(wrappedDirectionSet);
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
   * 画面内に収まるかを判定し、画面をはみ出す場合は回り込んだ方向を返す
   */
  private wrapPopupDirection(directionSet: DirectionSet): DirectionSet {
    const isPopupOutOfScreen = this.isPopupOutOfScreen(directionSet);
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

  private getPopupRect(directionSet: DirectionSet): Rect {
    const { anchorRect, popupSize, gap, scroll } = this;
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

  private isPopupOutOfScreen(
    directionSet: DirectionSet
  ): Record<Direction, boolean> {
    const { scroll, screenSize } = this;
    const popupRect = this.getPopupRect(directionSet);
    return {
      top: popupRect.top < scroll.y,
      left: popupRect.left < scroll.x,
      bottom: popupRect.bottom > scroll.y + screenSize.height,
      right: popupRect.right > scroll.x + screenSize.width,
    };
  }
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
  visualViewport,
}: {
  anchorRect: Rect;
  popupSize: Size;
  directionKey: DirectionKey;
  gap: number;
  screenSize: Size;
  scroll: Position;
  isDirectionFixed?: boolean;
  visualViewport?: { offsetTop: number; offsetLeft: number } | null;
}): { top: number; left: number } {
  const popup = new Popup({
    anchorRect,
    popupSize,
    gap,
    screenSize,
    scroll,
    isDirectionFixed,
    visualViewport,
  });
  return popup.getPosition(directionKey);
}
