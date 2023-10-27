import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  active?: boolean;
  isFirst: boolean;
};

const StepLine: FC<Props> = ({ className, style, active, isFirst }: Props) => (
  <span
    className={clsx(
      className,
      styles.stepLineStyle,
      styles.stepLineBackgroundStyle[active ? "active" : "inactive"],
      styles.stepLineWidthStyle[isFirst ? "first" : "default"]
    )}
    style={style}
  />
);

StepLine.displayName = ComponentName.StepLine;

export const WizStepLine = StepLine;
