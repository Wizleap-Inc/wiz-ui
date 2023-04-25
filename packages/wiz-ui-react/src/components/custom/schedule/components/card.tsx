import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";

import { ScheduleCardVariant } from "../types";

interface Props {
  variant?: ScheduleCardVariant;
  text: string;
  gridRow: string;
  gridColumn: string;
  show?: boolean;
}

export const WizScheduleCard = ({
  variant = "primary",
  text,
  gridRow,
  gridColumn,
  show = true,
}: Props) => {
  const showText = () => {
    const [start, end] = gridRow
      .split("/")
      .map((x) => x.trim())
      .map(Number);
    return end - start > 2;
  };

  return (
    <div
      className={styles.card[variant]}
      style={{ gridRow, gridColumn }}
      hidden={!show}
    >
      {showText() ? text : ""}
    </div>
  );
};
