import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  active?: boolean;
  isFirst: boolean;
};

const StepLine: FC<Props> = ({ active, isFirst }: Props) => (
  <span
    className={clsx(
      styles.stepLineStyle,
      styles.stepLineBackgroundStyle[active ? "active" : "inactive"],
      styles.stepLineWidthStyle[isFirst ? "first" : "default"]
    )}
  />
);

StepLine.displayName = ComponentName.StepLine;

export const WizStepLine = StepLine;
