import { ColorKeys, ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToYMDHM, formatHowPast } from "@wizleap-inc/wiz-ui-utils";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ComponentPropsWithoutRef,
} from "react";

import {
  WizBox,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizText,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTd,
  WizUnstyledTr,
  WizVStack,
} from "@/components";

import { PanelVariant, TableInfoItem } from "./types";

type Props = Omit<ComponentPropsWithoutRef<"div">, "onClick" | "title"> & {
  title: string;
  timestamp: Date;
  variant?: PanelVariant;
  read: boolean;
  tableInfo?: TableInfoItem[];
  width?: string;
  onClick?: () => void;
};

const NotificationPanel: FC<Props> = ({
  title,
  timestamp,
  variant = "primary",
  read,
  tableInfo,
  width,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayDatetime = useMemo(
    () => formatDateToYMDHM(timestamp),
    [timestamp]
  );
  const displayHowPast = useMemo(() => formatHowPast(timestamp), [timestamp]);

  const isPc = windowWidth > 768;

  const panelBgColor = (): ColorKeys => {
    if (isPc) {
      if (isPressed) {
        return "green.300";
      }
      if (isHovered) {
        return "gray.200";
      }
    }
    return "white.800";
  };
  return (
    <WizBox
      {...props}
      onMouseOver={useCallback(() => setIsHovered(true), [])}
      onMouseLeave={useCallback(() => setIsHovered(false), [])}
      onPointerDown={useCallback(() => setIsPressed(true), [])}
      onPointerUp={useCallback(() => setIsPressed(false), [])}
      onClick={onClick}
      bgColor={panelBgColor()}
      height="fit-content"
      cursor="pointer"
      width={width}
    >
      <WizHStack px="md" py="xs" justify="between" align="center" nowrap>
        <WizVStack position="relative" width="100%">
          {variant === "primary" && (
            <WizHStack justify="between" align="start">
              <WizUnstyledTable>
                <WizUnstyledTbody>
                  {tableInfo?.map((item, i) => (
                    <WizUnstyledTr key={`${item.title}_${i}`}>
                      <WizUnstyledTd
                        align="left"
                        style={{
                          paddingRight: THEME.spacing.xl,
                          paddingBottom: THEME.spacing.xs,
                        }}
                      >
                        <WizText bold={!read} fontSize="xs" color="gray.700">
                          {item.title}
                        </WizText>
                      </WizUnstyledTd>
                      <WizUnstyledTd
                        align="left"
                        style={{ paddingBottom: THEME.spacing.xs }}
                      >
                        <WizText bold={!read} fontSize="xs" color="gray.700">
                          {item.content}
                        </WizText>
                      </WizUnstyledTd>
                    </WizUnstyledTr>
                  ))}
                </WizUnstyledTbody>
              </WizUnstyledTable>
              <WizText color="gray.600" fontSize="xs2">
                {displayHowPast}
              </WizText>
            </WizHStack>
          )}
          <WizVStack gap="xs">
            <WizText color="gray.700" fontSize="xs" maxLines={2} bold={!read}>
              {title}
            </WizText>
            {variant === "secondary" && (
              <WizText color="gray.600" fontSize="xs2">
                {displayDatetime}
              </WizText>
            )}
          </WizVStack>
        </WizVStack>
        <WizIcon icon={WizIChevronRight} color="green.800" />
      </WizHStack>
    </WizBox>
  );
};

NotificationPanel.displayName = ComponentName.NotificationPanel;

export const WizNotificationPanel = NotificationPanel;
