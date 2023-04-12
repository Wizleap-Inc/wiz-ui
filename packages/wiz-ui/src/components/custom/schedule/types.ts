export type ScheduleCardVariant = "primary" | "secondary" | "tertiary";

export type ScheduleHourMinute = {
  hour: number;
  minute: number;
};

export interface ScheduleItem {
  id: string;
  start: ScheduleHourMinute;
  end: ScheduleHourMinute;
  text: string;
  variant?: ScheduleCardVariant;
}

export type Schedule = ScheduleItem[];
