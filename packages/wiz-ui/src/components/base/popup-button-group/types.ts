import { TIcon } from "@/components";
export interface SelectBoxOption {
  label: string;
  value: number;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  onClick: () => void;
}

export type ButtonGroupItem =
  | { kind: "button"; option: SelectBoxOption }
  | {
      kind: "group";
      title: string;
      items: ButtonGroupItem[];
      showDivider?: boolean;
    };
