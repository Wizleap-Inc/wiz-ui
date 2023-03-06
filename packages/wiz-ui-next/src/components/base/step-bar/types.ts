export type StepStatus = "done" | "pending";

export interface StepItem {
  status: StepStatus;
  label?: string;
  description?: string;
  progress?: boolean;
}
