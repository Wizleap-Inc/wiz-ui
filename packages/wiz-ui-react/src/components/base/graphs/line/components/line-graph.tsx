import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  percentage: number;
  hiddenBg: boolean;
};

const LineGraph: FC<Props> = ({ className, style, percentage, hiddenBg }) => {
  const bgStyle = hiddenBg ? "hidden" : "default";
  return (
    <div
      className={clsx(
        className,
        styles.lineGraphBaseBgStyle,
        styles.lineGraphBgStyle[bgStyle]
      )}
      style={style}
    >
      <div
        className={styles.lineGraphBarStyle}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

LineGraph.displayName = ComponentName.LineGraph;

export const WizLineGraph = LineGraph;
