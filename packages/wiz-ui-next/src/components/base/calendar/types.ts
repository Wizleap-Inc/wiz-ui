export type DateState = "primary" | "secondary";

export interface DateStatus {
  state: DateState;
  date: Date;
}
