import * as styles from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { FC } from "react";

import { Bar } from "./bar";

type Props = {
  percentage?: number;
  label?: string;
  innerLabel?: string;
  labelWidth: string;
  isColorFixed?: boolean;
};

export const Row: FC<Props> = ({
  percentage,
  label,
  innerLabel,
  labelWidth,
  isColorFixed,
}) => {
  return (
    <div className={styles.PollRowStyle}>
      <span className={styles.PollLabelStyle} style={{ width: labelWidth }}>
        {label}
      </span>
      <div className={styles.PollStyle}>
        {percentage !== undefined && (
          <Bar
            percentage={percentage}
            label={innerLabel}
            isColorFixed={isColorFixed}
          />
        )}
      </div>
    </div>
  );
};
