export type DateStatus = {
  date: Date;
  state: "primary" | "secondary";
};

export type CalendarDataItem = {
  isDisabled: boolean;
  label: string;
  isOutOfCurrentMonth?: boolean;
};
export type CalendarData = CalendarDataItem[][];
