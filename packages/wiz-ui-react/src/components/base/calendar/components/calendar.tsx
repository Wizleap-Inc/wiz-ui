import { ComponentName, WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import clsx from "clsx";
import { FC, useMemo } from "react";

import { BaseProps } from "@/types";

import { createCalendarData } from "./calendar-helper";
import { CalendarDataItem, DateStatus } from "./types";

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
        {calendarData.map((weekDataItems, row) => (
          <tr key={`week-${row}`}>
            {weekDataItems.map((item, col) => {
              const activeDateStatus = findActiveDateStatus(item);
              const itemStyle = getItemStyleState(item, activeDateStatus);
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
                    className={clsx(
                      styles.calendarItemCommonStyle,
                      styles.calendarItemStyle[itemStyle]
                    )}
                    onClick={() => handleClickDate(item)}
                  >
                    {item.label}
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
