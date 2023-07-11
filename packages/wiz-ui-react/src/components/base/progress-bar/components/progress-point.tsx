import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { FC } from "react";

import type { ProgressStatus } from "../types";

type Props = {
  status: ProgressStatus;
  value?: number;
};

const ProgressPoint: FC<Props> = ({ status, value }) => {
  return (
    <span
      className={clsx([
        [
          styles.progressPointStyle,
          status !== "none" && styles.progressPointVariantStyle[status],
        ],
      ])}
    >
      <span
        className={clsx([
          styles.progressPointValueStyle,
          styles.progressPointValueColorStyle[
            status === "active" ? "active" : "inactive"
          ],
        ])}
      >
        {value}
      </span>
    </span>
  );
};

ProgressPoint.displayName = ComponentName.ProgressPoint;

export const WizProgressPoint = ProgressPoint;