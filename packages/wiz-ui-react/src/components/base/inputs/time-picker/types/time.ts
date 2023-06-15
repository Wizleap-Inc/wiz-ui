export const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
] as const;

export const MINUTES = [0, 15, 30, 45] as const;

export type Time = {
  hour: (typeof HOURS)[number];
  minute: (typeof MINUTES)[number];
};
