export type ScheduleCardVariant = "primary" | "secondary" | "tertiary";

type _ScheduleHour = number;
type _ScheduleMinute = number;

export type ScheduleTime = {
  hour: _ScheduleHour;
  minute: _ScheduleMinute;
};

export interface ScheduleItem {
  id: string;
  col: number;
  start: ScheduleTime;
  end: ScheduleTime;
  text: string;
  variant?: ScheduleCardVariant;
}

export type Schedule = ScheduleItem[];
