import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import { gapStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { memo } from "react";

import { StepItem } from "./types";

import { WizStepLine, WizStepPoint } from "./";

type Props = {
  contents: StepItem[];
};

const _StepBar = ({ contents }: Props) => {
  return (
    <div className={styles.stepBarStyle}>
      {contents.map((item, index) => (
        <div
          key={item.id}
          className={styles.stepBarItemStyle[index === 0 ? "first" : "default"]}
        >
          <div
            className={clsx(styles.stepBarStackStyle, gapStyle["no"])}
            style={{ height: "100%" }}
          >
            <WizStepPoint status={item.status} />
            <span className={styles.progressBarItemLabelStyle}>
              <div className={clsx(styles.stepBarStackStyle, gapStyle["xs2"])}>
                {/* WizText */}
                <div>{item.label}</div>
                {/* WizText */}
                <div>{item.description}</div>
              </div>
            </span>
          </div>
          <WizStepLine active={item.progress} isFirst={index === 0} />
        </div>
      ))}
    </div>
  );
};
export const WizStepBar = memo(_StepBar);
