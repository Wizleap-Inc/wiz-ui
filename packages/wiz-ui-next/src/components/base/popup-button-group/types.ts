import { TIcon } from "@/components";
export interface SelectBoxOption {
  label: string;
  value: number;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  onClick: () => void;
}

export type Item =
  | { kind: "button"; option: SelectBoxOption }
  | { kind: "group"; title: string; items: Item[]; showDivider: boolean };
