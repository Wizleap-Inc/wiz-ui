export type ProgressStatus =
  | "done"
  | "active"
  | "inactive"
  | "none"
  | "pending"
  | "dead"
  | "rejected";

export type ProgressState = "active" | "inactive" | "rejected";

export interface ProgressItem {
  status: ProgressStatus;
  label?: string;
  annotation?: string;
  tooltip?: string;
  progress?: ProgressState;
  value?: number;
}
