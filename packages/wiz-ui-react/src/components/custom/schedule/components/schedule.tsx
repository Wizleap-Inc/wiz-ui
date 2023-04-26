import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";

import { Schedule } from "../types";

import { WizScheduleGrid } from "./grid";
import { WizScheduleSheet } from "./sheet";

interface Props {
  startHour?: number;
  endHour?: number;
  schedules?: Schedule;
  onScheduleClick?: (id: string) => void;
}

export const WizSchedule = ({
  startHour = constants.DEFAULT_SCHEDULE_HOUR_START,
  endHour = constants.DEFAULT_SCHEDULE_HOUR_END,
  schedules = [],
  onScheduleClick,
}: Props) => {
  return (
    <div className={styles.schedule}>
      <WizScheduleSheet startHour={startHour} endHour={endHour} />
      <WizScheduleGrid
        startHour={startHour}
        endHour={endHour}
        schedules={schedules}
        onScheduleClick={onScheduleClick}
      />
    </div>
  );
};

WizSchedule.displayName = ComponentName.Schedule;
