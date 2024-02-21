import { TIcon } from "@/components";

export interface PopupButtonOption<T> {
  label: string;
  value: T;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  disabled?: boolean;
  onClick: () => void;
}

export interface ButtonItem<T> {
  kind: "button";
  option: PopupButtonOption<T>;
}

interface DividerItem {
  kind: "divider";
}

export interface GroupItem<T> {
  kind: "group";
  title: string;
  // 再帰参照を許可するためにno-use-before-define無効化
  // eslint-disable-next-line no-use-before-define
  items: ButtonGroupItem<T>[];
  groupDivider?: boolean;
  buttonDivider?: boolean;
}

export type ButtonGroupItem<T> = ButtonItem<T> | DividerItem | GroupItem<T>;

export type ItemElement<T> =
  | DividerItem
  | { kind: "item"; item: Exclude<ButtonGroupItem<T>, DividerItem> };
