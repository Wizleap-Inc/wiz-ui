import { DirectionValues } from "../types/direction";

export type PopupPlacementStyle = {
  top?: number;
  left?: number;
  transform?: string;
};

type PlacementOption = {
  anchor: DOMRect;
  content?: DOMRect;
  gap?: string;
  usePortal?: boolean;
};

export const getPlacementStyle: Record<
  DirectionValues,
  (option: PlacementOption) => PopupPlacementStyle
> = {
  tl: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + window.scrollY,
        left: anchor.x + window.scrollX,
        transform: `translateY(-100%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offset = anchor.height + content.height;
    return {
      transform: `translateY(-${offset}px) translate(0, -${gap})`,
    };
  },
  tc: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + window.scrollY,
        left: anchor.x + anchor.width / 2 + window.scrollX,
        transform: `translateY(-100%) translateX(-50%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  tr: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + window.scrollY,
        left: anchor.x + anchor.width + window.scrollX,
        transform: `translateY(-100%) translateX(-100%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offsetY = anchor.height + content.height;
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  bl: ({ anchor, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height + window.scrollY,
        left: anchor.x + window.scrollX,
        transform: `translate(0, ${gap})`,
      };
    }
    return {};
  },
  bc: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height + window.scrollY,
        left: anchor.x + anchor.width / 2 + window.scrollX,
        transform: `translateX(-50%) translate(0, ${gap})`,
      };
    }
    if (!content) return {};
    const offsetX = (content.width - anchor.width) / 2;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  br: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height + window.scrollY,
        left: anchor.x + anchor.width + window.scrollX,
        transform: `translateX(-100%) translate(0, ${gap})`,
      };
    }
    if (!content) return {};
    const offsetX = content.width - anchor.width;
    return {
      transform: `translate(${-offsetX}px, 0) translate(0, ${gap})`,
    };
  },
  rt: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + window.scrollY,
        left: anchor.x + anchor.width + window.scrollX,
        transform: `translate(${gap}, 0)`,
      };
    }
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = anchor.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  rc: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height / 2 + window.scrollY,
        left: anchor.x + anchor.width + window.scrollX,
        transform: `translateY(-50%) translate(${gap}, 0)`,
      };
    }
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = (content.height + anchor.height) / 2;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px)  translate(${gap}, 0)`,
    };
  },
  rb: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height + window.scrollY,
        left: anchor.x + anchor.width + window.scrollX,
        transform: `translateY(-100%) translate(${gap}, 0)`,
      };
    }
    if (!content) return {};
    const offsetX = anchor.width;
    const offsetY = content.height;
    return {
      transform: `translate(${offsetX}px, ${-offsetY}px) translate(${gap}, 0)`,
    };
  },
  lt: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + window.scrollY,
        left: anchor.x + window.scrollX,
        transform: `translateX(-100%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offsetY = anchor.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  lc: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height / 2 + window.scrollY,
        left: anchor.x + window.scrollX,
        transform: `translate(-100%, -50%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offsetY = (content.height + anchor.height) / 2;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
  lb: ({ anchor, content, usePortal, gap }: PlacementOption) => {
    if (usePortal) {
      return {
        top: anchor.y + anchor.height + window.scrollY,
        left: anchor.x + window.scrollX,
        transform: `translate(-100%, -100%) translate(0, -${gap})`,
      };
    }
    if (!content) return {};
    const offsetY = content.height;
    const offsetX = content.width;
    return {
      transform: `translate(${-offsetX}px, ${-offsetY}px) translate(0, -${gap})`,
    };
  },
};

export const adjustDirection: Record<
  DirectionValues,
  (body: DOMRect, content: DOMRect, anchor: DOMRect) => DirectionValues
> = {
  bl: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const x =
      body.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  bc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const r =
      body.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  br: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  tl: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      body.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  tc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const r =
      body.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  tr: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  rt: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      body.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      body.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  rc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      body.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const b =
      body.height <
        anchor.y + (anchor.width + content.height) / 2 + window.scrollY && "b";
    const t =
      anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as DirectionValues;
  },
  rb: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      body.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      anchor.y + anchor.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as DirectionValues;
  },
  lt: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      body.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  lc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const b =
      body.height <
        anchor.y + (anchor.width + content.height) / 2 + window.scrollY && "b";
    const t =
      anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as DirectionValues;
  },
  lb: (_: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      anchor.y + anchor.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as DirectionValues;
  },
};
