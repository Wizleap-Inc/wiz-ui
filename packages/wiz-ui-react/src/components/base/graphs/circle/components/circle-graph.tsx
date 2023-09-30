import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";

import { BaseProps } from "@/types";

import { Bar } from "./bar";
import { CircleGraphData } from "./types";

type Props = BaseProps & {
  data: CircleGraphData[];
  otherLabel?: string;
  children?: ReactNode;
};

const CircleGraph: FC<Props> = ({
  className,
  style,
  data,
  otherLabel = "その他",
  children,
}) => {
  const percentages = useMemo(
    () => data.map((item) => item.percentage),
    [data]
  );

  return (
    <div className={clsx(className, styles.CircleGraphStyle)} style={style}>
      <Bar percentages={percentages}>{children}</Bar>
      <div className={styles.CircleGraphLabelContainerStyle}>
        {data.map((item, i) => (
          <div key={i} className={styles.CircleGraphLabelStyle}>
            <span
              className={styles.CircleGraphLabelIconStyle}
              style={{
                backgroundColor:
                  styles.GRAPH_COLORS[i] ||
                  styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
              }}
            />
            <span className={styles.CircleGraphLabelItemStyle}>
              {item.label}
            </span>
          </div>
        ))}
        <div className={styles.CircleGraphLabelStyle}>
          <span
            className={styles.CircleGraphLabelIconStyle}
            style={{
              backgroundColor:
                styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
            }}
          />
          <span className={styles.CircleGraphLabelItemStyle}>{otherLabel}</span>
        </div>
      </div>
    </div>
  );
};

CircleGraph.displayName = ComponentName.CircleGraph;

export const WizCircleGraph = CircleGraph;
