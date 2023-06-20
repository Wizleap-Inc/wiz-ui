import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import { ReactNode } from "react";

import { WizText, WizTooltip } from "@/components";

import { ProgressItem } from "../types";

import { WizProgressPoint } from "./progress-point";

import { WizProgressLine } from ".";

type Props = {
  contents: ProgressItem[];
  children?: ReactNode;
};

const Progress = (content: ProgressItem) => (
  <div className={styles.progressBarPointWrapperStyle}>
    <span className={styles.progressBarItemAnnotationStyle}>
      <WizText fontSize="xs2" color="red.800" whiteSpace="nowrap">
        {content.annotation}
      </WizText>
    </span>
    <WizProgressPoint status={content.status} value={content.value} />
    <span className={styles.progressBarItemLabelStyle}>
      <WizText fontSize="xs2" color="gray.600" whiteSpace="nowrap">
        {content.label}
      </WizText>
    </span>
  </div>
);

const ProgressBar = ({ ...props }: Props) => {
  return (
    <div className={styles.progressBarStyle}>
      {props.contents.map((content, index) => (
        <div
          className={
            styles.progressBarItemStyle[index === 0 ? "first" : "default"]
          }
          key={content.id}
        >
          {content.tooltip ? (
            <WizTooltip content={<>{content.tooltip}</>}>
              {Progress(content)}
            </WizTooltip>
          ) : (
            Progress(content)
          )}
          <WizProgressLine active={content.progress} isFirst={index === 0} />
        </div>
      ))}
    </div>
  );
};

ProgressBar.displayName = ComponentName.ProgressBar;

export const WizProgressBar = ProgressBar;
