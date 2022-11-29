import { ZIndexKeys } from "@/types/styles/z-index";

export const Z_INDEX_MAP = {
  base: 0,
  /**
   * dialog
   */
  dialog: 2000,
  /**
   * dropdown(選択系),tooltip(情報系),alert
   */
  popover: 3000,
} as const;

export const Z_INDEX_ACCESSORS = Object.keys(Z_INDEX_MAP) as ZIndexKeys[];
