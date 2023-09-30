import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";

import { BaseProps } from "@/types";

import { ScheduleItem, ScheduleTime } from "../types";

import { getSteppedTime } from "./time";

import { WizScheduleCard } from ".";

type Props = BaseProps & {
  startHour: number;
  endHour: number;
  schedules: ScheduleItem[];
  onScheduleClick?: (id: string) => void;
};

const getRowFromTime = (time: ScheduleTime) => {
  return (
    time.hour * constants.SCHEDULE_STEPS_PER_HOUR +
    (time.minute / 60) * constants.SCHEDULE_STEPS_PER_HOUR
  );
};

export const WizScheduleGrid = ({
  className,
  style,
  startHour,
  endHour,
  schedules,
  onScheduleClick,
}: Props) => {
  const colsCount = Math.max(...schedules.map((schedule) => schedule.col));
  const getGridRow = (start: ScheduleTime, end: ScheduleTime, name: string) => {
    if (start.hour < startHour) {
      console.warn(constants.WARN_SCHEDULE_START_HOUR(startHour, name));
      return null;
    }

    if (end.hour > endHour || (end.hour === endHour && end.minute > 0)) {
      console.warn(constants.WARN_SCHEDULE_END_HOUR(endHour, name));
      return null;
    }

    if (
      start.hour > end.hour ||
      (start.hour === end.hour && start.minute > end.minute)
    ) {
      console.warn(constants.WARN_SCHEDULE_START_LATER_THAN_END(name));
      return null;
    }

    const steppedStart = getSteppedTime(
      start,
      constants.SCHEDULE_STEPS_PER_HOUR
    );
    const steppedEnd = getSteppedTime(end, constants.SCHEDULE_STEPS_PER_HOUR);

    const startRow =
      getRowFromTime(steppedStart) -
      getRowFromTime({
        hour: startHour,
        minute: 0,
      });
    const endRow =
      getRowFromTime(steppedEnd) -
      getRowFromTime({
        hour: startHour,
        minute: 0,
      });

    if (startRow === endRow) {
      return `${startRow + 1} / ${endRow + 2}`;
    }

    return `${startRow + 1} / ${endRow + 1}`;
  };

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${colsCount}, 1fr)`,
      }}
    >
      {schedules.map((schedule) => (
        <WizScheduleCard
          className={className}
          style={style}
          key={schedule.id}
          id={schedule.id}
          text={schedule.text}
          variant={schedule.variant}
          gridRow={
            getGridRow(schedule.start, schedule.end, schedule.text) || ""
          }
          gridColumn={`${schedule.col} / ${schedule.col + 1}`}
          show={
            getGridRow(schedule.start, schedule.end, schedule.text) !== null
          }
          onScheduleClick={onScheduleClick}
        />
      ))}
    </div>
  );
};

WizScheduleGrid.displayName = ComponentName.ScheduleGrid;
