export interface TableInfoItem {
  title: string;
  content: string;
}

export interface NotificationItem {
  title: string;
  timestamp: Date;
  tabName: string;
  read: boolean;
  tableInfo?: TableInfoItem[];
}
