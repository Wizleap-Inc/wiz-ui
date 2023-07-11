import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import clsx from "clsx";
import { FC, ReactNode, useContext, useMemo } from "react";

import { WizIcon, WizTag } from "../../../base";
import { WizICalendar } from "../../../icons";

import { TimelineContext } from "./use-timeline";

type TimelineVariant = "success" | "failure";

interface TimelineItemProps {
  variant?: TimelineVariant;
  title: string;
  tag?: string;
  annotation?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

const TimelineItem: FC<TimelineItemProps> = ({
  variant = "success",
  title,
  tag,
  annotation,
  children,
  footer,
}) => {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      "TimelineItemはTimelineの子コンポーネントとして使用してください。"
    );
  }

  const { bp } = ctx;
  const size = useMemo(() => (bp === "sm" ? "sm" : "lg"), [bp]);
  const iconSize = useMemo(() => (bp === "sm" ? "md" : "xl2"), [bp]);
  const isTitleEscape = useMemo(() => bp === "sm" && tag, [bp, tag]);

  return (
    <div
      className={clsx(
        styles.container,
        styles.timelineItemVariant[size],
        styles.TIMELINE_ITEM_IDENTIFIER_CLASS
      )}
    >
      <div className={[styles.icon, styles.iconVariant[variant]].join(" ")}>
        <WizIcon size={iconSize} icon={WizICalendar} color="white.800" />
      </div>
      <div className={styles.card}>
        <div className={styles.contents}>
          <div className={styles.header}>
            <div className={styles.headerRow}>
              <span className={styles.titleContainer}>
                {tag && (
                  <WizTag
                    fontSize="xs"
                    label={tag}
                    fontWeight="bold"
                    variant={variant === "success" ? "green" : "red"}
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
