import { DirectionValues } from "../../types/direction";
import { PlacementOption, PlacementStyle } from "../../types/placement";

export const placeOnPortalStyle: Record<
  DirectionValues,
  (option: PlacementOption) => PlacementStyle
> = {
  tl: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translateY(-100%) translate(0, -${gap})`,
    };
  },

  tc: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width / 2 + window.scrollX,
      transform: `translateY(-100%) translateX(-50%) translate(0, -${gap})`,
    };
  },
  tr: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-100%) translateX(-100%) translate(0, -${gap})`,
    };
  },
  bl: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(0, ${gap})`,
    };
  },
  bc: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width / 2 + window.scrollX,
      transform: `translateX(-50%) translate(0, ${gap})`,
    };
  },
  br: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateX(-100%) translate(0, ${gap})`,
    };
  },
  rt: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translate(${gap}, 0)`,
    };
  },
  rc: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height / 2 + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-50%) translate(${gap}, 0)`,
    };
  },
  rb: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + anchor.width + window.scrollX,
      transform: `translateY(-100%) translate(${gap}, 0)`,
    };
  },
  lt: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translateX(-100%) translate(0, -${gap})`,
    };
  },
  lc: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height / 2 + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(-100%, -50%) translate(0, -${gap})`,
    };
  },
  lb: ({ anchor, gap, window }: PlacementOption) => {
    return {
      top: anchor.y + anchor.height + window.scrollY,
      left: anchor.x + window.scrollX,
      transform: `translate(-100%, -100%) translate(0, -${gap})`,
    };
  },
};
