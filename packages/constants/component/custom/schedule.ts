export const MIN_SCHEDULE_HOUR = 0;
export const MAX_SCHEDULE_HOUR = 23;

export const DEFAULT_SCHEDULE_HOUR_START = 8;
export const DEFAULT_SCHEDULE_HOUR_END = 22;

export const SCHEDULE_STEPS_PER_HOUR = 4;

export const WARN_SCHEDULE_NEGATIVE_RANGE = (from: number, to: number) =>
  `startHourはendHour以下の値を指定してください。\nstartHour: ${from}, endHour: ${to}`;

export const WARN_SCHEDULE_OUT_OF_RANGE = (
  edge: "start" | "end",
  hour: number
) =>
  `${edge}Hourは${MIN_SCHEDULE_HOUR}以上${MAX_SCHEDULE_HOUR}以下の値を指定してください。\n${edge}Hour: ${hour}`;
