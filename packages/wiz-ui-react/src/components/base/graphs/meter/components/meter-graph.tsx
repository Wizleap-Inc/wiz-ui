import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/meter-graph.css";
import { strokeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode } from "react";

type Props = {
  percentage: number;
  children?: ReactNode;
};

function getMeterColor(percentage: number): ColorKeys {
  if (percentage >= 75) return "green.700";
  if (percentage >= 50) return "blue.700";
  if (percentage >= 25) return "yellow.700";
  return "red.700";
}

function getBarWidthRatio(percentage: number) {
  if (percentage < 0) return 0;
  if (percentage > 100) return 1;
  return percentage / 100;
}

const MeterGraph: FC<Props> = ({ percentage, children }) => {
  const pathD = `
    M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
    a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
    a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${-1 * styles.DIAMETER}
  `;
  const pathTransform = `
    rotate(${(-styles.MAX_PERCENTAGE * 360) / 100 / 2}, ${
    styles.HALF_VIEW_BOX_SIZE
  }, ${styles.HALF_VIEW_BOX_SIZE})
  `;

  return (
    <div className={styles.MeterBarContainerStyle}>
      <svg
        className={styles.MeterBarSVGStyle}
        viewBox={`0 0 ${styles.VIEW_BOX_SIZE} ${styles.VIEW_BOX_SIZE}`}
      >
        <path
          className={styles.MeterBarBgStyle}
          strokeDasharray={`${styles.MAX_PERCENTAGE}, 100`}
          strokeWidth={styles.STROKE_WIDTH}
          d={pathD}
          transform={pathTransform}
        />
        {percentage > 0 && (
          <path
            className={clsx(
              styles.MeterBarStyle,
              strokeStyle[getMeterColor(percentage)]
            )}
            strokeDasharray={`${
              getBarWidthRatio(percentage) * styles.MAX_PERCENTAGE
            }, 100`}
            strokeWidth={styles.STROKE_WIDTH}
            d={pathD}
            transform={pathTransform}
          />
        )}
      </svg>
      <div className={styles.MeterBarPercentageStyle}>{children}</div>
    </div>
  );
};

MeterGraph.displayName = ComponentName.MeterGraph;

export const WizMeterGraph = MeterGraph;
