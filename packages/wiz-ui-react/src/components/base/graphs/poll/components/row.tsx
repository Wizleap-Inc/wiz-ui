import * as styles from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";

import { Bar } from "./bar";

type Props = BaseProps & {
  percentage?: number;
  label?: string;
  innerLabel?: string;
  labelWidth: string;
  isColorFixed?: boolean;
};

export const Row: FC<Props> = ({
  className,
  style,
  percentage,
  label,
  innerLabel,
  labelWidth,
  isColorFixed,
}) => {
  return (
    <div className={clsx(className, styles.PollRowStyle)} style={style}>
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
