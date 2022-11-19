import { FontSizeKeys } from "@/types/styles/fontSize";

export const Z_INDEX_MAP = {
  0: 0,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
  999: 999,
} as const;

export const Z_INDEX_ACCESSORS = Object.keys(Z_INDEX_MAP) as FontSizeKeys[];
