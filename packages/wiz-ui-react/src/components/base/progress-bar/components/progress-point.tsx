import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { ReactNode, memo } from "react";

import type { ProgressStatus } from "./types";

type Props = {
  status: ProgressStatus;
  value?: number;
  children?: ReactNode;
};

const _ProgressPoint = ({ status, value }: Props) => {
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

_ProgressPoint.displayName = ComponentName.ProgressPoint;

export const WizProgressPoint = memo(_ProgressPoint);
