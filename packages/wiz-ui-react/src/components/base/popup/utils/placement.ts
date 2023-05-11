import { Direction } from "../types/direction";

export type PopupPlacementStyle = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  transform?: string;
};

export const getPlacementStyle: Record<
  Direction,
  (rect: DOMRect, gap?: string) => PopupPlacementStyle
> = {
  tl: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-100%) translate(0, -${gap})`,
  }),
  tc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: `translateY(-100%) translateX(-50%) translate(0, -${gap})`,
  }),
  tr: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-100%) translateX(-100%) translate(0, -${gap})`,
  }),
  bl: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translate(0, ${gap})`,
  }),
  bc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: `translateX(-50%) translate(0, ${gap})`,
  }),
  br: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateX(-100%) translate(0, ${gap})`,
  }),
  rt: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translate(${gap}, 0)`,
  }),
  rc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-50%) translate(${gap}, 0)`,
  }),
  rb: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-100%) translate(${gap}, 0)`,
  }),
  lt: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateX(-100%) translate(-${gap}, 0)`,
  }),
  lc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-50%) translateX(-100%) translate(-${gap}, 0)`,
  }),
  lb: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-100%) translateX(-100%) translate(-${gap}, 0)`,
  }),
};

export const adjustDirection: Record<
  Direction,
  (body: DOMRect, content: DOMRect, anchor: DOMRect) => Direction
> = {
  bl: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + window.scrollY ? "t" : "b";
    const x =
      body.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as Direction;
  },
  bc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + window.scrollY ? "t" : "b";
    const r =
      body.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as Direction;
  },
  br: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      body.height < anchor.y + anchor.height + window.scrollY ? "t" : "b";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as Direction;
  },
  tl: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      body.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as Direction;
  },
  tc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const r =
      body.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as Direction;
  },
  tr: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as Direction;
  },
  rt: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      body.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      body.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as Direction;
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
    return `${x}${t || b || "c"}` as Direction;
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
    return `${x}${y}` as Direction;
  },
  lt: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      body.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as Direction;
  },
  lc: (body: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const b =
      body.height <
        anchor.y + (anchor.width + content.height) / 2 + window.scrollY && "b";
    const t =
      anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as Direction;
  },
  lb: (_: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      anchor.y + anchor.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as Direction;
  },
};
