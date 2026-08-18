import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";

import type { ProgressState } from "../types";

type Props = BaseProps & {
  state?: ProgressState;
  isFirst: boolean;
};

const ProgressLine: FC<Props> = ({
  className,
  style,
  state = "inactive",
  isFirst,
}) => {
  return (
    <span
      className={clsx(
        className,
        styles.progressLineStyle,
        styles.progressLineBackgroundStyle[state],
        styles.progressLineWidthStyle[isFirst ? "first" : "default"]
      )}
      style={style}
    />
  );
};

ProgressLine.displayName = ComponentName.ProgressLine;

export const WizProgressLine = ProgressLine;
