import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, useEffect, useRef } from "react";

function getBarColor(percentage: number, isColorFixed?: boolean): ColorKeys {
  if (isColorFixed) return "green.700";
  if (percentage >= 75) return "green.700";
  if (percentage >= 50) return "blue.700";
  if (percentage >= 25) return "yellow.700";
  return "red.700";
}

import { BaseProps } from "@/types";
type Props = BaseProps & {
  percentage: number;
  label?: string;
  isColorFixed?: boolean;
};

export const Bar: FC<Props> = ({
  className,
  style,
  percentage,
  label,
  isColorFixed,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const barColor = getBarColor(percentage, isColorFixed);

  useEffect(() => {
    const barElm = barRef.current;
    const labelElm = labelRef.current;
    if (!barElm || !labelElm) return;

    const resizeObserver = new ResizeObserver(() => {
      barElm.style.width = `max(${percentage}%, ${labelElm.offsetWidth}px)`;
    });
    resizeObserver.observe(labelElm);
    return () => {
      resizeObserver.disconnect();
    };
  }, [percentage]);

  return (
    <div className={styles.PollGraphStyle}>
      <div
        ref={barRef}
        className={clsx(styles.PollBodyStyle, backgroundStyle[barColor])}
        style={{
          backgroundColor: barColor,
        }}
      >
        <span ref={labelRef} className={styles.PollGraphInnerLabelStyle}>
          {label}
        </span>
      </div>
    </div>
  );
};
