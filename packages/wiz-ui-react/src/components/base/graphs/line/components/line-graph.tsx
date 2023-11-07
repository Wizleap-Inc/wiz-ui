import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  percentage: number;
};

const LineGraph: FC<Props> = ({ className, style, percentage }) => {
  return (
    <div className={clsx(className, styles.lineGraphBgStyle)} style={style}>
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
