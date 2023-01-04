export type ProgressStatus =
  | "done"
  | "active"
  | "inactive"
  | "none"
  | "pending"
  | "dead";

export interface ProgressItem {
  status: ProgressStatus;
  label?: string;
  annotation?: string;
  tooltip?: string;
  progress?: boolean;
  value?: number;
}
