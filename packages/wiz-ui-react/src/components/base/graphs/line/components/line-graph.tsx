import { ComponentName, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  percentage: number;
  hiddenBg?: boolean;
  activeColor?: ColorKeys;
  size?: "sm" | "md";
};

const LineGraph: FC<Props> = ({
  className,
  style,
  percentage,
  hiddenBg,
  activeColor = "green.800",
  size = "sm",
}) => {
  const bgStyle = hiddenBg ? "hidden" : "default";
  return (
    <div
      className={clsx(
        className,
        styles.lineGraphContainerStyle[size],
        styles.lineGraphBgStyle[bgStyle]
      )}
      style={style}
    >
      <div
        className={clsx(
          styles.lineGraphBarSizeStyle[size],
          styles.lineGraphBarColorStyle[activeColor]
        )}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

LineGraph.displayName = ComponentName.LineGraph;

export const WizLineGraph = LineGraph;
