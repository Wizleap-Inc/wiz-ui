import { TIcon } from "@/components";
export interface PopupButtonOption<T> {
  label: string;
  value?: T;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  disabled?: boolean;
  onClick: () => void;
}

export type ButtonGroupItem<T> =
  | { kind: "button"; option: PopupButtonOption<T> }
  | { kind: "divider" }
  | {
      kind: "group";
      title: string;
      items: ButtonGroupItem<T>[];
      groupDivider?: boolean;
      buttonDivider?: boolean;
    };
