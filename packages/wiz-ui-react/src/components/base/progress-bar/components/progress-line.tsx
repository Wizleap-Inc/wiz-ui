import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  active?: boolean;
  isFirst: boolean;
};

const ProgressLine: FC<Props> = ({ active, isFirst }) => {
  return (
    <span
      className={clsx(
        styles.progressLineStyle,
        styles.progressLineBackgroundStyle[active ? "active" : "inactive"],
        styles.progressLineWidthStyle[isFirst ? "first" : "default"]
      )}
    />
  );
};

ProgressLine.displayName = ComponentName.ProgressLine;

export const WizProgressLine = ProgressLine;
