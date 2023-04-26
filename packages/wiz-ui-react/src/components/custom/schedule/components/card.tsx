import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { clsx } from "clsx";

import { ScheduleCardVariant } from "../types";

interface Props {
  id: string;
  variant?: ScheduleCardVariant;
  text: string;
  gridRow: string;
  gridColumn: string;
  show?: boolean;
  onScheduleClick?: (id: string) => void;
}

export const WizScheduleCard = ({
  id,
  variant = "primary",
  text,
  gridRow,
  gridColumn,
  show = true,
  onScheduleClick,
}: Props) => {
  const displayText = () => {
    const [start, end] = gridRow
      .split("/")
      .map((x) => x.trim())
      .map(Number);
    return end - start > 2 ? text : "";
  };

  if (!onScheduleClick) {
    return (
      <div
        className={styles.card[variant]}
        style={{ gridRow, gridColumn }}
        hidden={!show}
      >
        {displayText()}
      </div>
    );
  }

  return (
    <button
      className={clsx(styles.card[variant], styles.buttonCard)}
      style={{ gridRow, gridColumn }}
      hidden={!show}
      onClick={() => onScheduleClick(id)}
    >
      {displayText()}
    </button>
  );
};

WizScheduleCard.displayName = ComponentName.ScheduleCard;
