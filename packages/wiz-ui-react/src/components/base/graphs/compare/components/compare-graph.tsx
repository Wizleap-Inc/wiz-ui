import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/compare-graph.css";
import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";

import { BaseProps } from "@/types";

import { Bar } from "./bar";
import { CompareGraphData } from "./types";

type Props = BaseProps & {
  data: CompareGraphData[];
  /** 縦軸の最大値を設定します。 */
  maxFrequency?: number;
  /** 縦軸の最大値をceilN桁で切り上げて設定します。 */
  ceilN?: number;
  /** バーの間隔に影響します。0~1の値を指定してください。 */
  barGap?: number;
  /** バーの太さに影響します。0~1の値を指定してください。 */
  barGroupWidth?: number;
  /** 単位を指定してください。 */
  unit?: string;
  /**
   * ラベルの単位の表示位置を指定します。
   * @param {String} unitPosition - ラベルの単位の表示位置を指定します。以下のいずれかの値を指定できます:
   *   - "vertical": 縦軸の目盛に対して単位を表示します。
   *   - "intersection": 縦軸と横軸が交わる位置に単位を表示します。
   *   - "no": 単位を表示しません。
   * @default "no"
   * @required false
   */
  unitPosition?: "vertical" | "intersection" | "no";
  /**
   * 横軸ラベルを傾けるかを指定します。
   * @param isTilted
   * @default false
   */
  isTilted?: boolean;
  children?: ReactNode;
};

const CompareGraph: FC<Props> = ({
  className,
  style,
  data,
  maxFrequency,
  ceilN = 0,
  barGap = 0.1,
  barGroupWidth = 0.8,
  unit,
  unitPosition = "no",
  isTilted = false,
  children,
}) => {
  const annotationUnit = unitPosition === "intersection" ? unit : undefined;
  const labelUnit = unitPosition === "vertical" ? unit : undefined;
  const theta = isTilted ? Math.PI / 4 : 0;

  const actualMaxFrequency = useMemo(() => {
    if (maxFrequency) {
      return maxFrequency;
    }
    const allItemData = data.map((item) => item.data).flat();
    const maxFrequencyOfItems = Math.max(
      ...allItemData.map((item) => item.frequency)
    );
    const powerOfTen = Math.pow(10, ceilN);
    return Math.ceil(maxFrequencyOfItems / powerOfTen) * powerOfTen;
  }, [ceilN, data, maxFrequency]);

  return (
    <div className={clsx(className, styles.graphContainerStyle)} style={style}>
      <div className={styles.graphSideStyle}>
        {annotationUnit && (
          <span
            className={clsx(
              styles.graphSideLabelStyle,
              styles.graphSideLabelPositionStyle["unit"]
            )}
          >
            ({annotationUnit})
          </span>
        )}
        <span
          className={clsx(
            styles.graphSideLabelStyle,
            styles.graphSideLabelPositionStyle["max"]
          )}
        >
          {actualMaxFrequency}
        </span>
        <span
          className={clsx(
            styles.graphSideLabelStyle,
            styles.graphSideLabelPositionStyle["half"]
          )}
        >
          {Math.ceil(actualMaxFrequency / 2)}
          {labelUnit}
        </span>
      </div>
      <div className={styles.graphContainerBodyStyle}>
        <div className={styles.graphBodyStyle}>
          {data.map((barData, i) => (
            <Bar
              key={`${i}-${barData.label}`}
              data={barData}
              maxFrequency={actualMaxFrequency}
              barGap={barGap}
              barGroupWidth={barGroupWidth}
              theta={theta}
            />
          ))}
        </div>
        <div className={styles.summaryLabelStyle}>{children}</div>
      </div>
    </div>
  );
};

CompareGraph.displayName = ComponentName.CompareGraph;

export const WizCompareGraph = CompareGraph;
