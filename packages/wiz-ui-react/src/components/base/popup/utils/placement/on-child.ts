import { DirectionValues } from "../../types/direction";
import { PlacementOption, PlacementStyle } from "../../types/placement";

export const placeOnChildStyle: Record<
  DirectionValues,
  (option: PlacementOption) => PlacementStyle
> = {
  tl: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offset = anchor.height + content.height;
    return {
      transform: `translateY(-${offset}px) translate(0, -${gap})`,
    };
  },
  tc: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  tr: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  bl: ({}: PlacementOption) => {
    return {};
  },
  bc: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  br: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  rt: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = anchor.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  rc: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = (content.height + anchor.height) / 2;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px)  translate(${gap}, 0)`,
    };
  },
  rb: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = content.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  lt: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  lc: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = (content.height + anchor.height) / 2;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  lb: ({ content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = content.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
};
