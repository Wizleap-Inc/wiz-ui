import { DirectionValue } from "../../types/direction";
import { PlacementOption, PlacementStyle } from "../../types/placement";

export const placeOnChildStyle: Record<
  DirectionValue,
  (option: PlacementOption) => PlacementStyle
> = {
  topLeft: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offset = anchor.height + content.height;
    return {
      transform: `translateY(-${offset}px) translate(0, -${gap})`,
    };
  },
  topCenter: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  topRight: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  bottomLeft: ({}: PlacementOption) => {
    return {};
  },
  bottomCenter: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  bottomRight: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  rightTop: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = anchor.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  rightCenter: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = (content.height + anchor.height) / 2;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px)  translate(${gap}, 0)`,
    };
  },
  rightBottom: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = content.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  leftTop: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = anchor.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  leftCenter: ({ anchor, content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = (content.height + anchor.height) / 2;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  leftBottom: ({ content, gap }: PlacementOption) => {
    if (!content) return {};
    const offsetY = content.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
};
