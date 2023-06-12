export const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
] as const;

export const MINUTE_MAP = {
  0: "00",
  15: "15",
  30: "30",
  45: "45",
} as const;

export type Time =
  | {
      hour: (typeof HOURS)[number];
      minute: keyof typeof MINUTE_MAP;
    }
  | {
      hour: null;
      minute: null;
    };
