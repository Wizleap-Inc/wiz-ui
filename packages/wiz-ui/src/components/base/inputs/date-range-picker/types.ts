export type DateRange =
  | {
      start: Date;
      end: Date;
    }
  | {
      start: Date;
      end: null;
    }
  | {
      start: null;
      end: null;
    };

export interface DateRangePickerSelectBoxOption {
  label: string;
  value: string;
}
