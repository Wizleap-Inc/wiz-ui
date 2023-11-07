import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { formatNumHourToTime } from "@wizleap-inc/wiz-ui-utils";
import clsx from "clsx";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  startHour: number;
  endHour: number;
};

export const WizScheduleSheet = ({
  className,
  style,
  startHour,
  endHour,
}: Props) => {
  if (startHour > endHour) {
    console.warn(constants.WARN_SCHEDULE_NEGATIVE_RANGE(startHour, endHour));
  }

  if (
    startHour < constants.MIN_SCHEDULE_HOUR ||
    startHour > constants.MAX_SCHEDULE_HOUR
  ) {
    console.warn(constants.WARN_SCHEDULE_OUT_OF_RANGE("start", startHour));
  }

  if (
    endHour < constants.MIN_SCHEDULE_HOUR ||
    endHour > constants.MAX_SCHEDULE_HOUR
  ) {
    console.warn(constants.WARN_SCHEDULE_OUT_OF_RANGE("end", endHour));
  }

  return (
    <table className={clsx(className, styles.sheet)} style={style}>
      <tbody>
        {Array.from({ length: endHour - startHour + 1 }, (_, i) => (
          <tr key={i} className={styles.cols}>
            <td className={styles.time}>
              {formatNumHourToTime(startHour + i)}
            </td>
            <td className={styles.timeSpace}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

WizScheduleSheet.displayName = ComponentName.ScheduleSheet;
