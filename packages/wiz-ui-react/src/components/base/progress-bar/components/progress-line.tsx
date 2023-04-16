import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { memo } from "react";

type Props = {
  active?: boolean;
  isFirst: boolean;
};

const _ProgressLine = ({ active, isFirst }: Props) => {
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

_ProgressLine.displayName = ComponentName.ProgressLine;

export const WizProgressLine = memo(_ProgressLine);
