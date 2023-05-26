import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import clsx from "clsx";
import { FC } from "react";

import { WizText, WizVStack } from "@/components";

import { StepItem } from "./types";

import { WizStepLine, WizStepPoint } from "./";

type Props = {
  contents: StepItem[];
  className?: string;
};

const StepBar: FC<Props> = ({ contents, className }: Props) => {
  return (
    <div className={clsx(styles.stepBarStyle, className)}>
      {contents.map((item, index) => {
        const isFirst = index === 0;
        const color = item.status === "done" ? "green.800" : "gray.800";
        return (
          <div
            key={item.id}
            className={styles.stepBarItemStyle[isFirst ? "first" : "default"]}
          >
            <WizVStack align="center" gap="no" height="100%">
              <WizStepPoint status={item.status} />
              <span className={styles.progressBarItemLabelStyle}>
                <WizVStack align="center" gap="xs2">
                  <WizText fontSize="sm" whiteSpace="nowrap" bold color={color}>
                    {item.label}
                  </WizText>
                  <WizText fontSize="xs" whiteSpace="nowrap" color={color}>
                    {item.description}
                  </WizText>
                </WizVStack>
              </span>
            </WizVStack>
            <WizStepLine active={item.progress} isFirst={isFirst} />
          </div>
        );
      })}
    </div>
  );
};

StepBar.displayName = ComponentName.StepBar;

export const WizStepBar = StepBar;
