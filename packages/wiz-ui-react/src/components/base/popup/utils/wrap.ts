import { DirectionValues } from "../types/direction";

export const wrapDirection: Record<
  DirectionValues,
  (bound: DOMRect, content: DOMRect, anchor: DOMRect) => DirectionValues
> = {
  bl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      bound.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const x =
      bound.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  bc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      bound.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const r =
      bound.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  br: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y =
      bound.height < anchor.y + anchor.height + content.height + window.scrollY
        ? "t"
        : "b";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  tl: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      bound.width < anchor.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as DirectionValues;
  },
  tc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const r =
      bound.width <
        anchor.x + (anchor.width + content.width) / 2 + window.scrollX && "r";
    const l =
      anchor.x - (anchor.width + content.width) / 2 + window.scrollX < 0 && "l";
    return `${y}${l || r || "c"}` as DirectionValues;
  },
  tr: (_: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const y = anchor.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      anchor.x + anchor.width - content.width + window.scrollX < 0 ? "l" : "r";
    return `${y}${x}` as DirectionValues;
  },
  rt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      bound.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      bound.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  rc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      bound.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const b =
      bound.height <
        anchor.y + (anchor.width + content.height) / 2 + window.scrollY && "b";
    const t =
      anchor.y - (anchor.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as DirectionValues;
  },
  rb: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x =
      bound.width < anchor.x + anchor.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      anchor.y + anchor.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as DirectionValues;
  },
  lt: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      bound.height < anchor.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as DirectionValues;
  },
  lc: (bound: DOMRect, content: DOMRect, anchor: DOMRect) => {
    const x = anchor.x - content.width + window.scrollX < 0 ? "r" : "l";
    const b =
      bound.height <
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
