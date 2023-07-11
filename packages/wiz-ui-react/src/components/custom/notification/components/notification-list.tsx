import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC, Fragment } from "react";

import { WizBox, WizDivider, WizHStack, WizText } from "@/components";

import { WizNotificationPanel } from "./notification-panel";
import { NotificationItem, PanelVariant } from "./types";

type Props = {
  variant?: PanelVariant;
  notifications: NotificationItem[];
  height?: string;
  emptyMessage?: string;
  onClick?: (id: string) => void;
};

const NotificationList: FC<Props> = ({
  variant,
  notifications,
  height,
  emptyMessage,
  onClick,
}) => {
  return (
    <WizBox height={height} overflowY="scroll">
      {notifications.map((notification, i) => (
        <Fragment key={notification.id}>
          <WizNotificationPanel
            variant={variant}
            read={notification.read}
            title={notification.title}
            timestamp={notification.timestamp}
            tableInfo={notification.tableInfo}
            onClick={() => onClick?.(notification.id)}
          />
          {i !== notifications.length - 1 && <WizDivider />}
        </Fragment>
      ))}
      {notifications.length === 0 && (
        <WizHStack align="center" justify="center" height="100%">
          <WizText color="gray.600" fontSize="sm">
            {emptyMessage}
          </WizText>
        </WizHStack>
      )}
    </WizBox>
  );
};

NotificationList.displayName = ComponentName.NotificationList;

export const WizNotificationList = NotificationList;
