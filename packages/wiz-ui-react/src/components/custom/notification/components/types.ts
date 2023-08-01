export type PanelVariant = "primary" | "secondary";

export type NotificationTabItem = {
  label: string;
  name: string;
  notificationCount?: number;
  disabled?: boolean;
  variant: PanelVariant;
};

export type TableInfoItem = {
  title: string;
  content: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  timestamp: Date;
  tabName: string;
  read: boolean;
  tableInfo?: TableInfoItem[];
};
