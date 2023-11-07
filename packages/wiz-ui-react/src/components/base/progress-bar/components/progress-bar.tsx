import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import clsx from "clsx";
import { FC } from "react";

import { WizTooltip } from "@/components";
import { BaseProps } from "@/types";

import { ProgressItem } from "../types";

import { Progress } from "./progress";

import { WizProgressLine } from ".";

type Props = BaseProps & {
  contents: ProgressItem[];
};

const ProgressBar: FC<Props> = ({ className, style, contents }) => {
  return (
    <div className={clsx(className, styles.progressBarStyle)} style={style}>
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
