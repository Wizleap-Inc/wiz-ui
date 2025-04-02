import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import clsx from "clsx";
import { FC, ReactNode, useContext, useMemo } from "react";

import { WizHStack, WizIcon, WizTag, WizVStack } from "../../../base";
import { TIcon, WizICalendar } from "../../../icons";

import { TimelineContext } from "./use-timeline";

type TimelineVariant = "success" | "failure" | "yellow" | "gray";

interface TimelineItemProps {
  variant?: TimelineVariant;
  title: string;
  tag?: string;
  annotation?: ReactNode;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
  icon?: TIcon;
  backgroundColor?: Extract<ColorKeys, "white.800" | "gray.200">;
}

const TAG_COLOR_MAP = {
  success: "green",
  failure: "red",
  yellow: "yellow",
  gray: "gray",
} as const;

const TimelineItem: FC<TimelineItemProps> = ({
  variant = "success",
  title,
  tag,
  annotation,
  children,
  footer,
  header,
  disabled = false,
  icon = WizICalendar,
  backgroundColor = "white.800",
}) => {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      "TimelineItemはTimelineの子コンポーネントとして使用してください。"
    );
  }

  const { device } = ctx;
  const iconSize = useMemo(
    () => (device === "mobile" ? "md" : "xl2"),
    [device]
  );

  return (
    <div
      className={clsx(
        styles.container,
        styles.timelineItemVariant[device],
        styles.TIMELINE_ITEM_IDENTIFIER_CLASS
      )}
    >
      <div
        className={clsx(
          styles.icon,
          styles.iconVariant[variant],
          disabled && styles.disabled
        )}
      >
        <WizIcon size={iconSize} icon={icon} color="white.800" />
      </div>
      <div
        className={clsx(
          styles.card,
          disabled && styles.disabled,
          backgroundStyle[backgroundColor]
        )}
      >
        <div className={styles.contents}>
          <div className={styles.header}>
            {device === "pc" ? (
              <WizHStack justify="between">
                <WizVStack gap="xs">
                  <WizHStack gap="xs" align="center">
                    {tag && (
                      <WizTag
                        fontSize="xs"
                        label={tag}
                        fontWeight="bold"
                        variant={TAG_COLOR_MAP[variant]}
                      />
                    )}
                    <div className={styles.title}>{title}</div>
                  </WizHStack>
                  {header && <div>{header}</div>}
                </WizVStack>
                <div className={styles.annotation}>{annotation}</div>
              </WizHStack>
            ) : (
              <WizVStack gap="xs">
                <WizHStack nowrap justify="between" align="center">
                  {(tag && (
                    <WizTag
                      fontSize="xs"
                      label={tag}
                      fontWeight="bold"
                      variant={TAG_COLOR_MAP[variant]}
                    />
                  )) || <span className={styles.title}>{title}</span>}
                  <div className={styles.annotation}>{annotation}</div>
                </WizHStack>
                {tag && <div className={styles.title}>{title}</div>}
                {header && <div>{header}</div>}
              </WizVStack>
            )}
          </div>
          {children && <div className={styles.body}>{children}</div>}
        </div>
        {footer}
      </div>
    </div>
  );
};

TimelineItem.displayName = ComponentName.TimelineItem;

export const WizTimelineItem = TimelineItem;
