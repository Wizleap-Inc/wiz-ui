import { TabItem } from "@/components/base/tab/types";

import { PanelVariant } from "./panel/types";

export type NotificationTabItem = TabItem & {
  variant: PanelVariant;
};

export interface TableInfoItem {
  title: string;
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  timestamp: Date;
  tabName: string;
  read: boolean;
  tableInfo?: TableInfoItem[];
}
