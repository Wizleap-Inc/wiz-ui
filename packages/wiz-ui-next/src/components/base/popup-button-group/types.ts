export interface SelectBoxOption {
  label: string;
  value: number;
  exLabel?: string;
  icon?: "openNew" | "addCircle";
  onClick: () => void;
}

export type Item =
  | { kind: "button"; option: SelectBoxOption }
  | { kind: "group"; title: string; items: Item[] }; // divider: boolean?
