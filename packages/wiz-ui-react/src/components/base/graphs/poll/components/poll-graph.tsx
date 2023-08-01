import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { FC } from "react";

import { Row } from "./row";

type PollGraphData = {
  innerLabel: string;
  label: string;
  percentage: number;
};

type Props = {
  data: PollGraphData[];
  rowCount?: number;
  labelWidth?: string;
  isColorFixed?: boolean;
};

const PollGraph: FC<Props> = ({
  data,
  rowCount = 0,
  labelWidth = "5rem",
  isColorFixed,
}) => {
  const emptyRowLength = Math.max(rowCount - data.length, 0);

  return (
    <div className={styles.PollGraphWrapperStyle}>
      {data.map((item, i) => (
        <Row
          key={`${i}-${item.label}-${item.percentage}`}
          {...item}
          labelWidth={labelWidth}
          isColorFixed={isColorFixed}
        />
      ))}
      {Array.from({ length: emptyRowLength }).map((_, i) => (
        <Row
          key={`${i}-empty`}
          labelWidth={labelWidth}
          isColorFixed={isColorFixed}
        />
      ))}
      <span
        className={styles.PollGraphDividerStyle}
        style={{
          top: 0,
          bottom: 0,
          left: `calc(${labelWidth} - ${styles.DIVIDER_WIDTH})`,
        }}
      />
    </div>
  );
};

PollGraph.displayName = ComponentName.PollGraph;

export const WizPollGraph = PollGraph;
