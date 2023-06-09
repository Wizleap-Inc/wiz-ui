import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import { FC } from "react";

import { WizICircleCheck, WizIcon } from "@/components";

import { StepStatus } from "./types";

type Props = {
  status: StepStatus;
};

const status2color: Record<string, ColorKeys> = {
  done: "green.800",
  pending: "gray.500",
};

const StepPoint: FC<Props> = ({ status }: Props) => {
  return (
    <span className={styles.stepPointStyle}>
      <span className={styles.stepPointValueStyle}>
        <WizIcon
          icon={WizICircleCheck}
          size={"xl6"}
          color={status2color[status]}
        />
      </span>
    </span>
  );
};

StepPoint.displayName = ComponentName.StepPoint;

export const WizStepPoint = StepPoint;
