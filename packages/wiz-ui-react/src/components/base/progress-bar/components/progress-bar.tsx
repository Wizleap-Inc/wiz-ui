import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
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
  labelColor?: ColorKeys;
  labelSize?: FontSizeKeys;
  annotationColor?: ColorKeys;
  annotationSize?: FontSizeKeys;
};

const ProgressBar: FC<Props> = ({
  className,
  style,
  contents,
  labelColor = "gray.600",
  labelSize = "xs2",
  annotationColor = "red.800",
  annotationSize = "xs2",
}) => {
  const progressProps = {
    labelColor,
    labelSize,
    annotationColor,
    annotationSize,
  };
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
              <Progress content={content} {...progressProps} />
            </WizTooltip>
          ) : (
            <Progress content={content} {...progressProps} />
          )}
          <WizProgressLine state={content.progress} isFirst={index === 0} />
        </div>
      ))}
    </div>
  );
};

ProgressBar.displayName = ComponentName.ProgressBar;

export const WizProgressBar = ProgressBar;
