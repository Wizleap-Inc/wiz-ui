import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  active?: boolean;
  isFirst: boolean;
};

const ProgressLine: FC<Props> = ({ className, style, active, isFirst }) => {
  return (
    <span
      className={clsx(
        className,
        styles.progressLineStyle,
        styles.progressLineBackgroundStyle[active ? "active" : "inactive"],
        styles.progressLineWidthStyle[isFirst ? "first" : "default"]
      )}
      style={style}
    />
  );
};

ProgressLine.displayName = ComponentName.ProgressLine;

export const WizProgressLine = ProgressLine;
