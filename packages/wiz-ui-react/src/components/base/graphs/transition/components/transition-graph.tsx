import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";
import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";

import { BaseProps } from "@/types";

import { Bar } from "./bar";

type TransitionGraphData = {
  label: string;
  frequency: number;
};

type Props = BaseProps & {
  data: TransitionGraphData[];
  children?: ReactNode;
};

const TransitionGraph: FC<Props> = ({ className, style, data, children }) => {
  const maxFrequency = useMemo(
    () => Math.max(...data.map((item) => item.frequency)),
    [data]
  );

  const formattedBarData = useMemo(
    () =>
      data.map((item, i) => ({
        ...item,
        lastFrequency: i === 0 ? null : data[i - 1].frequency,
      })),
    [data]
  );

  return (
    <div className={clsx(className, styles.graphContainerStyle)} style={style}>
      <div className={styles.graphSideStyle}>
        <span
          className={clsx(
            styles.graphSideLabelStyle,
            styles.graphSideLabelPositionStyle["max"]
          )}
        >
          {maxFrequency}
        </span>
        <span
          className={clsx(
            styles.graphSideLabelStyle,
            styles.graphSideLabelPositionStyle["half"]
          )}
        >
          {Math.ceil(maxFrequency / 2)}
        </span>
      </div>
      <div className={styles.graphContainerBodyStyle}>
        <div className={styles.graphBodyStyle}>
          {formattedBarData.map((item, i) => (
            <Bar
              key={`${i}-${item.label}-${item.frequency}-${item.lastFrequency}`}
              {...item}
              maxFrequency={maxFrequency}
            />
          ))}
        </div>
        <div className={styles.summaryLabelStyle}>{children}</div>
      </div>
    </div>
  );
};

TransitionGraph.displayName = ComponentName.TransitionGraph;

export const WizTransitionGraph = TransitionGraph;
