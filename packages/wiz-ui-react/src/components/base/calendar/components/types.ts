export type DateStatus = {
  date: Date;
  state: "primary" | "secondary";
};

export type CalendarDataItem = {
  date: Date;
  label: string;
  isOutOfCurrentMonth?: boolean;
};
export type CalendarData = CalendarDataItem[][];
