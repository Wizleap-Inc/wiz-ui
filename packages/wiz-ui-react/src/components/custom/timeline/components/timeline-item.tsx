import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import clsx from "clsx";
import { FC, ReactNode, useContext, useMemo } from "react";

import { WizIcon, WizTag } from "../../../base";
import { TIcon, WizICalendar } from "../../../icons";

import { TimelineContext } from "./use-timeline";

type TimelineVariant = "success" | "failure" | "yellow" | "gray";

interface TimelineItemProps {
  variant?: TimelineVariant;
  title: string;
  tag?: string;
  annotation?: ReactNode;
  children?: ReactNode;
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
  const isTitleEscape = useMemo(
    () => device === "mobile" && tag,
    [device, tag]
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
            <div className={styles.headerRow}>
              <span className={styles.titleContainer}>
                {tag && (
                  <WizTag
                    fontSize="xs"
                    label={tag}
                    fontWeight="bold"
                    variant={TAG_COLOR_MAP[variant]}
                  />
                )}
                {!isTitleEscape && (
                  <span className={styles.title}>{title}</span>
                )}
              </span>
              <span className={styles.annotation}>{annotation}</span>
            </div>
            {isTitleEscape && <span className={styles.title}>{title}</span>}
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
