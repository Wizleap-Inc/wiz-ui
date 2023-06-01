import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
import clsx from "clsx";
import { FC, ComponentProps, useMemo } from "react";

import { Bar } from "./bar";
import { CircleGraphData } from "./types";

type Props = {
  data: CircleGraphData[];
  otherLabel?: string;
} & ComponentProps<"div">;

const CircleGraph: FC<Props> = ({
  data,
  otherLabel = "その他",
  children,
  className,
  ...props
}) => {
  const percentages = useMemo(
    () => data.map((item) => item.percentage),
    [data]
  );

  return (
    <div className={clsx(styles.CircleGraphStyle, className)} {...props}>
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
