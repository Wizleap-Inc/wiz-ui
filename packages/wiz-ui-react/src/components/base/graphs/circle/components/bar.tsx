import * as styles from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
import { FC, ReactNode, useMemo } from "react";

type Props = {
  percentages: number[];
  children?: ReactNode;
};

export const Bar: FC<Props> = ({ percentages, children }) => {
  const barDisplayData = useMemo(() => {
    let currentRotatedPercentage = 0;
    return percentages
      .map((percentage) => {
        const startPercentage = currentRotatedPercentage;
        currentRotatedPercentage += percentage;
        return {
          width: percentage - styles.STROKE_WIDTH,
          startPercentage,
        };
      })
      .filter((data) => data.width > 0);
  }, [percentages]);

  const pathD = `M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
                 a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
                 a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${
    -1 * styles.DIAMETER
  }`;

  return (
    <div className={styles.CircleBarContainerStyle}>
      <svg
        className={styles.CircleBarSVGStyle}
        viewBox={`0 0 ${styles.VIEW_BOX_SIZE} ${styles.VIEW_BOX_SIZE}`}
      >
        <path
          className={styles.CircleBarBgStyle}
          strokeWidth={styles.STROKE_WIDTH}
          d={pathD}
        />
        {barDisplayData.map((item, i) => (
          <path
            key={`${i}-${item.startPercentage}-${item.width}`}
            className={styles.CircleBarStyle}
            style={{
              stroke:
                styles.GRAPH_COLORS[i] ||
                styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
            }}
            strokeDasharray={`${item.width}, 100`}
            strokeWidth={styles.STROKE_WIDTH}
            d={pathD}
            transform={`rotate(${
              ((item.startPercentage + styles.STROKE_WIDTH / 2) * 360) / 100
            }, ${styles.HALF_VIEW_BOX_SIZE}, ${styles.HALF_VIEW_BOX_SIZE})`}
          />
        ))}
      </svg>
      <div className={styles.CircleBarPercentageStyle}>{children}</div>
    </div>
  );
};
