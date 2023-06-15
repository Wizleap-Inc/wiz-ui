import { TIcon } from "@/components";

export interface PopupButtonOption {
  label: string;
  value: number;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  disabled?: boolean;
  onClick: () => void;
}

export interface ButtonItem {
  kind: "button";
  option: PopupButtonOption;
}

interface DividerItem {
  kind: "divider";
}

export interface GroupItem {
  kind: "group";
  title: string;
  // 再帰参照を許可するためにno-use-before-define無効化
  // eslint-disable-next-line no-use-before-define
  items: ButtonGroupItem[];
  groupDivider?: boolean;
  buttonDivider?: boolean;
}

export type ButtonGroupItem = ButtonItem | DividerItem | GroupItem;

export type ItemElement =
  | DividerItem
  | { kind: "item"; item: Exclude<ButtonGroupItem, DividerItem> };
