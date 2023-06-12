import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import { FC } from "react";

type Props = {
  percentage: number;
};

const LineGraph: FC<Props> = ({ percentage }) => {
  return (
    <div className={styles.lineGraphBgStyle}>
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
