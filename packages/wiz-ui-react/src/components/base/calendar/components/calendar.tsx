import { WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import clsx from "clsx";
import { FC, useMemo } from "react";

import { createCalendarData } from "./calendar-helper";
import { DateStatus } from "./types";

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
            {weekDataItems.map(({ label, isOutOfCurrentMonth }, col) => {
              const foundActiveDate = activeDates?.find((activeDate) => {
                return (
                  activeDate.date.getFullYear() ===
                    currentMonth.getFullYear() &&
                  activeDate.date.getMonth() === currentMonth.getMonth() &&
                  activeDate.date.getDate() === Number(label)
                );
              });
              function getItemStyleState(): keyof typeof styles.calendarItemStyle {
                if (isOutOfCurrentMonth) return "outOfCurrentMonth";
                return foundActiveDate?.state ?? "inCurrentMonth";
              }

              return (
                <td
                  key={`${label}-${col}`}
                  className={styles.calendarCellStyle}
                >
                  <button
                    disabled={
                      isOutOfCurrentMonth ||
                      foundActiveDate?.state === "primary"
                    }
                    aria-label={`${currentMonth.getFullYear()}年${
                      currentMonth.getMonth() + 1
                    }月${label}日${foundActiveDate ? "-選択済み" : ""}`}
                    className={clsx(
                      styles.calendarItemCommonStyle,
                      styles.calendarItemStyle[getItemStyleState()]
                    )}
                    onClick={() =>
                      onClickDate?.(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          Number(label)
                        )
                      )
                    }
                  >
                    {label}
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

export const WizCalendar = Calendar;
