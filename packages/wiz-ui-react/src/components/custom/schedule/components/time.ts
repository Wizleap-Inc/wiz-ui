import { ScheduleTime } from "../types";

export const getSteppedMinute = (minute: number, stepsPerHour: number) => {
  const step = 60 / stepsPerHour;
  const res = Math.floor(minute / step) * step;
  if (res < 0) return 0;
  if (res >= 60) return 0;
  return res;
};

export const getSteppedTime = (
  time: ScheduleTime,
  stepsPerHour: number
): ScheduleTime => {
  const { hour, minute } = time;
  return {
    hour,
    minute: getSteppedMinute(minute, stepsPerHour),
  };
};
