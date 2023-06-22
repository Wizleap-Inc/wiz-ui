import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import { FC } from "react";

import { WizTooltip } from "@/components";

import { ProgressItem } from "../types";

import { Progress } from "./progress";

import { WizProgressLine } from ".";

type Props = {
  contents: ProgressItem[];
};

const ProgressBar: FC<Props> = ({ contents }) => {
  return (
    <div className={styles.progressBarStyle}>
      {contents.map((content, index) => (
        <div
          className={
            styles.progressBarItemStyle[index === 0 ? "first" : "default"]
          }
          key={content.id}
        >
          {content.tooltip ? (
            <WizTooltip content={content.tooltip}>
              <Progress content={content} />
            </WizTooltip>
          ) : (
            <Progress content={content} />
          )}
          <WizProgressLine active={content.progress} isFirst={index === 0} />
        </div>
      ))}
    </div>
  );
};

ProgressBar.displayName = ComponentName.ProgressBar;

export const WizProgressBar = ProgressBar;
