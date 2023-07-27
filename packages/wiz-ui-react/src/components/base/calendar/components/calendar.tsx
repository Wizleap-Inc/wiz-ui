import { ComponentName, WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import clsx from "clsx";
import { FC, useMemo } from "react";

import { createCalendarData } from "./calendar-helper";
import { CalendarDataItem, DateStatus } from "./types";

type Props = {
  currentMonth?: Date;
  activeDates?: DateStatus[];
  filledWeeks?: boolean;
  onClickDate?: (selectedValue: Date) => void;
};

const Calendar: FC<Props> = ({
  currentMonth = new Date(),
  activeDates,
  filledWeeks,
  onClickDate,
}) => {
  const calendarData = useMemo(
    () => createCalendarData(currentMonth, filledWeeks),
    [currentMonth, filledWeeks]
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
    <table className={styles.calendarStyle}>
      <thead>
        <tr>
          {WEEK_LIST_JP.map((dayLabel) => (
            <td key={dayLabel} className={styles.calendarCellStyle}>
              <div
                className={clsx(
                  styles.calendarItemCommonStyle,
                  styles.calendarItemStyle["dayOfWeek"]
                )}
              >
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
              return (
                <td
                  key={`${item.label}-${col}`}
                  className={styles.calendarCellStyle}
                >
                  <button
                    disabled={item.isOutOfCurrentMonth}
                    aria-label={`${currentMonth.getFullYear()}年${
                      currentMonth.getMonth() + 1
                    }月${item.label}日${activeDateStatus ? "-選択済み" : ""}`}
                    className={clsx(
                      styles.calendarItemCommonStyle,
                      styles.calendarItemStyle[
                        getItemStyleState(item, activeDateStatus)
                      ]
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
