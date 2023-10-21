export const Z_INDEX_MAP = {
  base: "0",
  /**
   * floating
   * @description floating elements
   * @example
   * 1. ChatCard
   * 2. NotificationCard
   */
  floating: "1000",
  /**
   * dialog
   */
  dialog: "2000",
  /**
   * dropdown(選択系),tooltip(情報系),alert
   */
  popover: "3000",
  /**
   * overlay(全画面系)
   */
  overlay: "4000",
} as const;

export type ZIndexKeys = keyof typeof Z_INDEX_MAP;

export const Z_INDEX_ACCESSORS = Object.keys(Z_INDEX_MAP) as ZIndexKeys[];

export const getZIndexCss = (key: ZIndexKeys): string => Z_INDEX_MAP[key];
