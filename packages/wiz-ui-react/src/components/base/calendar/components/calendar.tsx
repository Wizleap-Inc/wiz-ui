import {
  ComponentName,
  THEME,
  WEEK_LIST_JP,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import clsx from "clsx";
import { FC, useMemo } from "react";

import { BaseProps } from "@/types";

import { createCalendarData } from "./calendar-helper";
import { CalendarDataItem, DateStatus } from "./types";

type CalenderItem = {
  item: CalendarDataItem;
  itemStyle: keyof typeof styles.calendarItemStyle;
  activeDateStatus: DateStatus | undefined;
};

type AdjacentItems = {
  current: CalenderItem;
  top?: DateStatus;
  bottom?: DateStatus;
  left?: DateStatus;
  right?: DateStatus;
};

type RadiusStyle = {
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
};

const activeItemRadiusStyle = (
  adjacent: AdjacentItems,
  isActiveDate: (date: Date) => boolean
): RadiusStyle => {
  const { top, bottom, left, right, current } = adjacent;
  const { activeDateStatus: currentDate, itemStyle } = current;

  if (!currentDate) {
    return {};
  }

  const calculateDate = (date: Date, offset: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  };

  const nextDate = calculateDate(currentDate.date, 1);
  const prevDate = calculateDate(currentDate.date, -1);
  const next = isActiveDate(nextDate);
  const prev = isActiveDate(prevDate);

  const radius = THEME.spacing.xs2;

  const radiusStyle = {
    borderTopLeftRadius:
      (!left && !top && radius) ||
      (!left && top?.state === "primary" && radius) ||
      undefined,
    borderTopRightRadius: (!top && !right && radius) || undefined,
    borderBottomLeftRadius: (!bottom && !left && radius) || undefined,
    borderBottomRightRadius:
      (!right && !bottom && radius) ||
      (!right && bottom?.state === "primary" && radius) ||
      undefined,
  };

  if (itemStyle === "primary") {
    return {
      borderTopLeftRadius: (!prev && "50%") || radiusStyle.borderTopLeftRadius,
      borderBottomLeftRadius:
        (!prev && "50%") || radiusStyle.borderBottomLeftRadius,
      borderTopRightRadius:
        (!next && "50%") || radiusStyle.borderTopRightRadius,
      borderBottomRightRadius:
        (!next && "50%") || radiusStyle.borderBottomRightRadius,
    };
  }

  return radiusStyle;
};

const primaryItemInnerRadiusStyle = (isPrimary: boolean) => ({
  borderRadius: isPrimary ? "50%" : undefined,
});

type Props = BaseProps & {
  currentMonth?: Date;
  activeDates?: DateStatus[];
  filledWeeks?: boolean;
  onClickDate?: (selectedValue: Date) => void;
  /**
   * @description 日付が無効かどうかを判定する関数です。無効な日付はクリック不可になります。
   * @param date
   * @returns {boolean} `true`: 無効な日付, `false`: 有効な日付
   */
  disabledDate?: (date: Date) => boolean;
};

const Calendar: FC<Props> = ({
  className,
  style,
  currentMonth = new Date(),
  activeDates,
  filledWeeks,
  onClickDate,
  disabledDate,
}) => {
  const calendarData = useMemo(
    () => createCalendarData(currentMonth, filledWeeks, disabledDate),
    [currentMonth, filledWeeks, disabledDate]
  );

  function findActiveDateStatus(item: CalendarDataItem) {
    return activeDates?.find((activeDate) => {
      return (
        activeDate.date.getDate() === Number(item.label) &&
        activeDate.date.getMonth() === currentMonth.getMonth() &&
        activeDate.date.getFullYear() === currentMonth.getFullYear()
      );
    });
  }

  function getItemStyleState(
    item: CalendarDataItem,
    dateStatus?: DateStatus
  ): keyof typeof styles.calendarItemStyle {
    if (item.isOutOfCurrentMonth) return "outOfCurrentMonth";
    if (item.isDisabled) return "disabledDate";
    return dateStatus?.state ?? "inCurrentMonth";
  }

  function handleClickDate(item: CalendarDataItem) {
    if (item.isOutOfCurrentMonth) {
      return;
    }
    onClickDate?.(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        Number(item.label)
      )
    );
  }
  const calendarItems = calendarData.map((weekDateItems) => {
    return weekDateItems.map((item) => {
      const activeDateStatus = findActiveDateStatus(item);
      const itemStyle = getItemStyleState(item, activeDateStatus);
      const r: CalenderItem = {
        item,
        itemStyle,
        activeDateStatus,
      };
      return r;
    });
  });

  const adjacentItems = (() => {
    return calendarItems.map((weekItems, row) => {
      return weekItems.map((item, col) => {
        const current = item;
        const top = calendarItems[row - 1]?.[col]?.activeDateStatus;
        const bottom = calendarItems[row + 1]?.[col]?.activeDateStatus;
        const left = calendarItems[row]?.[col - 1]?.activeDateStatus;
        const right = calendarItems[row]?.[col + 1]?.activeDateStatus;
        const r: AdjacentItems = {
          current,
          top,
          bottom,
          left,
          right,
        };
        return r;
      });
    });
  })();

  const activeDatesSet = new Set(
    activeDates?.map((activeDate) => {
      return new Date(
        activeDate.date.getFullYear(),
        activeDate.date.getMonth(),
        activeDate.date.getDate()
      ).getTime();
    })
  );

  const isActiveDate = (date: Date) =>
    activeDatesSet.has(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    );
  return (
    <table className={clsx(className, styles.calendarStyle)} style={style}>
      <thead>
        <tr>
          {WEEK_LIST_JP.map((dayLabel) => (
            <td key={dayLabel} className={styles.calendarCellStyle}>
              <div className={styles.calendarItemStyle["dayOfWeek"]}>
                {dayLabel}
              </div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {adjacentItems.map((weekDataItems, row) => (
          <tr key={`week-${row}`}>
            {weekDataItems.map((adjacent, col) => {
              const item = adjacent.current.item;
              const itemStyle = adjacent.current.itemStyle;
              const activeDateStatus = adjacent.current.activeDateStatus;
              return (
                <td
                  key={`${item.label}-${col}`}
                  className={styles.calendarCellStyle}
                >
                  <button
                    type="button"
                    disabled={
                      item.isOutOfCurrentMonth || itemStyle === "disabledDate"
                    }
                    aria-label={`${currentMonth.getFullYear()}年${
                      currentMonth.getMonth() + 1
                    }月${item.label}日${activeDateStatus ? "-選択済み" : ""}`}
                    className={styles.calendarItemCommonStyle}
                    onClick={() => handleClickDate(item)}
                  >
                    <div
                      className={clsx(
                        styles.calendarItemContainerStyle,
                        itemStyle === "primary" &&
                          styles.calendarPrimaryItemContainerStyle
                      )}
                      style={activeItemRadiusStyle(adjacent, isActiveDate)}
                    >
                      <div
                        className={styles.calendarItemStyle[itemStyle]}
                        style={primaryItemInnerRadiusStyle(
                          adjacent.current.itemStyle === "primary"
                        )}
                      >
                        <div className={styles.calendarItemInteractiveStyle}>
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Calendar.displayName = ComponentName.Calendar;

export const WizCalendar = Calendar;
