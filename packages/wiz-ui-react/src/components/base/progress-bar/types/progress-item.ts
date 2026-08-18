import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";

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
  id: string;
  status: ProgressStatus;
  label?: string;
  annotation?: string;
  tooltip?: string;
  progress?: ProgressState;
  value?: number;
  labelColor?: ColorKeys;
  labelSize?: FontSizeKeys;
  annotationColor?: ColorKeys;
  annotationSize?: FontSizeKeys;
}
