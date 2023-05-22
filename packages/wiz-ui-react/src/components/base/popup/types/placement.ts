export type PlacementOption = {
  anchor: DOMRect;
  content?: DOMRect;
  window: {
    scrollX: number;
    scrollY: number;
  };
  gap?: string;
};

export type PlacementStyle = {
  top?: number;
  left?: number;
  transform?: string;
};
