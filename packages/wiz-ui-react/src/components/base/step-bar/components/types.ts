export type StepStatus = "done" | "pending";

export interface StepItem {
  id: string;
  status: StepStatus;
  label?: string;
  description?: string;
  progress?: boolean;
}
