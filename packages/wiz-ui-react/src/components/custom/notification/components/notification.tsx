import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC, useMemo, useState } from "react";

import { WizBox, WizTab } from "@/components";

import { WizNotificationList } from "./notification-list";
import { NotificationItem, NotificationTabItem } from "./types";

type Props = {
  tabs: NotificationTabItem[];
  notifications: NotificationItem[];
  height?: string;
  emptyMessage?: string;
  onClick?: (id: string) => void;
};

const Notification: FC<Props> = ({
  tabs,
  notifications,
  height,
  emptyMessage,
  onClick,
}) => {
  const [activeTabName, setActiveTabName] = useState<string>(
    tabs[0].name ?? ""
  );

  const displayNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) => notification.tabName === activeTabName
      ),
    [activeTabName, notifications]
  );

  const selectedVariant = useMemo(
    () => tabs.find((tab) => tab.name === activeTabName)?.variant,
    [activeTabName, tabs]
  );

  return (
    <div>
      <WizTab
        items={tabs}
        activeTabName={activeTabName}
        onClickTab={(name) => setActiveTabName(name)}
      />
      <WizBox bgColor="white.800" roundB="xs2" overflow="hidden">
        <WizNotificationList
          notifications={displayNotifications}
          variant={selectedVariant}
          height={height}
          emptyMessage={emptyMessage}
          onClick={onClick}
        />
      </WizBox>
    </div>
  );
};

Notification.displayName = ComponentName.Notification;

export const WizNotification = Notification;
