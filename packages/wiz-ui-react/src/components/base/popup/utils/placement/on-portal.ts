import { DirectionValue } from "../../types/direction";
import { PlacementOption, PlacementStyle } from "../../types/placement";

export const placeOnPortalStyle: Record<
  DirectionValue,
  (option: PlacementOption) => PlacementStyle
> = {
  topLeft: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translateY(-100%) translate(0, -${gap})`,
    };
  },

  topCenter: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width / 2 + window.scrollX,
      transform: `translateY(-100%) translateX(-50%) translate(0, -${gap})`,
    };
  },
  topRight: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-100%) translateX(-100%) translate(0, -${gap})`,
    };
  },
  bottomLeft: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(0, ${gap})`,
    };
  },
  bottomCenter: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width / 2 + window.scrollX,
      transform: `translateX(-50%) translate(0, ${gap})`,
    };
  },
  bottomRight: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateX(-100%) translate(0, ${gap})`,
    };
  },
  rightTop: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translate(${gap}, 0)`,
    };
  },
  rightCenter: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height / 2 + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-50%) translate(${gap}, 0)`,
    };
  },
  rightBottom: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-100%) translate(${gap}, 0)`,
    };
  },
  leftTop: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translateX(-100%) translate(-${gap}, 0)`,
    };
  },
  leftCenter: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height / 2 + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(-100%, -50%) translate(-${gap}, 0)`,
    };
  },
  leftBottom: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(-100%, -100%) translate(-${gap}, 0)`,
    };
  },
};
