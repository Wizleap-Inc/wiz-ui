import { ZIndexKeys } from "@/types/styles/z-index";

export const Z_INDEX_MAP = {
  base: 0,
  popup: 2000,
} as const;

export const Z_INDEX_ACCESSORS = Object.keys(Z_INDEX_MAP) as ZIndexKeys[];
