import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToYMDHM, formatHowPast } from "@wizleap-inc/wiz-ui-utils";
import { FC, useCallback, useMemo, useState } from "react";

import {
  WizBox,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizText,
  WizVStack,
} from "@/components";

import { PanelVariant, TableInfoItem } from "./types";

type Props = {
  title: string;
  timestamp: Date;
  variant?: PanelVariant;
  read: boolean;
  tableInfo?: TableInfoItem[];
  onClick?: () => void;
};

const NotificationPanel: FC<Props> = ({
  title,
  timestamp,
  variant = "primary",
  read,
  tableInfo,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const displayDatetime = useMemo(
    () => formatDateToYMDHM(timestamp),
    [timestamp]
  );
  const displayHowPast = useMemo(() => formatHowPast(timestamp), [timestamp]);

  return (
    <WizBox
      onMouseOver={useCallback(() => setIsHovered(true), [])}
      onMouseLeave={useCallback(() => setIsHovered(false), [])}
      onPointerDown={useCallback(() => setIsPressed(true), [])}
      onPointerUp={useCallback(() => setIsPressed(false), [])}
      onClick={onClick}
      bgColor={isHovered ? "green.300" : "white.800"}
      opacity={isPressed ? 0.5 : 1}
      height="fit-content"
      cursor="pointer"
    >
      <WizHStack px="md" py="xs" justify="between" align="center" wrap={false}>
        <WizVStack gap="xs" position="relative" width="100%">
          {variant === "primary" && (
            <WizHStack justify="between" align="start">
              <WizVStack gap="xs">
                {tableInfo?.map((item, i) => (
                  <WizHStack key={i} gap="xl">
                    <WizText bold={!read} fontSize="xs" color="gray.700">
                      {item.title}
                    </WizText>
                    <WizText bold={!read} fontSize="xs" color="gray.700">
                      {item.content}
                    </WizText>
                  </WizHStack>
                ))}
              </WizVStack>
              <WizText color="gray.600" fontSize="xs2">
                {displayHowPast}
              </WizText>
            </WizHStack>
          )}
          <WizText color="gray.700" fontSize="xs" maxLines={2} bold={!read}>
            {title}
          </WizText>
          {variant === "secondary" && (
            <WizText color="gray.600" fontSize="xs2">
              {displayDatetime}
            </WizText>
          )}
        </WizVStack>
        <WizIcon
          icon={WizIChevronRight}
          color={isHovered || isPressed ? "green.800" : "gray.500"}
        />
      </WizHStack>
    </WizBox>
  );
};

NotificationPanel.displayName = ComponentName.NotificationPanel;

export const WizNotificationPanel = NotificationPanel;
