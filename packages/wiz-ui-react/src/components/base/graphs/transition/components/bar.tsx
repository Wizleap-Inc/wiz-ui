import * as styles from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";
import clsx from "clsx";
import { FC, useEffect, useMemo, useRef } from "react";

type Props = {
  label: string;
  frequency: number;
  lastFrequency: number | null;
  maxFrequency: number;
};

export const Bar: FC<Props> = ({
  label,
  frequency,
  lastFrequency,
  maxFrequency,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionLineRef = useRef<HTMLDivElement>(null);
  const transitionLabelRef = useRef<HTMLDivElement>(null);
  const frequencyRef = useRef<HTMLSpanElement>(null);
  const currentBarRef = useRef<HTMLDivElement>(null);

  const frequencyRatio = maxFrequency === 0 ? 0 : frequency / maxFrequency;
  const transitionData = useMemo(() => {
    if (lastFrequency === null) {
      return null;
    }
    return {
      lastFrequencyRatio: maxFrequency === 0 ? 0 : lastFrequency / maxFrequency,
      frequencyRatioChange:
        lastFrequency === 0 ? 0 : frequency / lastFrequency - 1,
      isDropped: frequency < lastFrequency,
    };
  }, [frequency, lastFrequency, maxFrequency]);

  useEffect(() => {
    const wrapperElm = wrapperRef.current;
    const transitionElm = transitionRef.current;
    const transitionLineElm = transitionLineRef.current;
    const transitionLabelElm = transitionLabelRef.current;

    if (
      !transitionData ||
      !wrapperElm ||
      !transitionElm ||
      !transitionLineElm ||
      !transitionLabelElm
    )
      return;

    const updateTransitionStyles = () => {
      const transitionWidth = transitionElm.offsetWidth;
      const transitionHeight = transitionElm.offsetHeight;
      const lineWidth = Math.sqrt(
        Math.pow(transitionWidth, 2) + Math.pow(transitionHeight, 2)
      );
      const lineTilt = transitionData.isDropped
        ? Math.atan(transitionHeight / transitionWidth)
        : -1 * Math.atan(transitionHeight / transitionWidth);

      transitionLineElm.style.width = `${lineWidth}px`;
      transitionLineElm.style.transform = `rotate(${lineTilt}rad)`;

      if (
        transitionHeight +
          transitionElm.offsetTop +
          transitionLabelElm.offsetHeight <
        wrapperElm.offsetHeight
      ) {
        // 下側にラベルを表示
        transitionLabelElm.style.top = "100%";
        transitionLabelElm.style.bottom = "unset";
      } else {
        // 上側にラベルを表示
        transitionLabelElm.style.top = "unset";
        transitionLabelElm.style.bottom = "100%";
      }
    };
    const transitionResizeObserver = new ResizeObserver(() => {
      updateTransitionStyles();
    });
    transitionResizeObserver.observe(transitionElm);
    return () => {
      transitionResizeObserver.disconnect();
    };
  }, [transitionData]);

  useEffect(() => {
    if (frequency === 0) return;

    const currentBarElm = currentBarRef.current;
    const frequencyElm = frequencyRef.current;

    if (!currentBarElm || !frequencyElm) return;

    const updateFrequencyStyles = () => {
      if (frequencyElm.offsetHeight > currentBarElm.offsetHeight) {
        // ラベルの高さがバーの高さを超える場合、ラベルをバーの外側に表示
        frequencyElm.style.top = "unset";
        frequencyElm.style.bottom = "100%";
        frequencyElm.style.color = "#606166";
        return;
      }
      const heightDelta =
        currentBarElm.offsetHeight - frequencyElm.offsetHeight;
      const defaultVerticalMargin = 8;
      const actualMargin = Math.min(defaultVerticalMargin, heightDelta / 2);
      frequencyElm.style.top = `${actualMargin}px`;
      frequencyElm.style.bottom = "unset";
      frequencyElm.style.color = "";
    };

    const currentBarResizeObserver = new ResizeObserver(() => {
      updateFrequencyStyles();
    });
    currentBarResizeObserver.observe(currentBarElm);
    return () => {
      currentBarResizeObserver.disconnect();
    };
  }, [frequency]);

  return (
    <div ref={wrapperRef} className={styles.graphBarStyle}>
      <span className={styles.graphBarLabelStyle}>{label}</span>
      {transitionData !== null && (
        <>
          <div
            ref={transitionRef}
            className={styles.graphBarTransitionStyle}
            style={{
              height: `${
                Math.abs(transitionData.lastFrequencyRatio - frequencyRatio) *
                100
              }%`,
              top: `${Math.min(
                (1 - transitionData.lastFrequencyRatio) * 100,
                (1 - frequencyRatio) * 100
              )}%`,
            }}
          >
            <div
              ref={transitionLineRef}
              className={styles.graphBarTransitionLineStyle}
              style={{
                display:
                  frequency === 0 && lastFrequency === 0 ? "none" : "block",
                transformOrigin: transitionData.isDropped
                  ? "left top"
                  : "left bottom",
                top: transitionData.isDropped ? "0" : "100%",
              }}
            />
            <div
              ref={transitionLabelRef}
              className={styles.graphBarTransitionLabelStyle}
            >
              {frequency === 0 && lastFrequency === 0
                ? "―"
                : Math.abs(
                    Math.floor(transitionData.frequencyRatioChange * 100)
                  )}
              %
              <br />
              {transitionData.isDropped ? "Dropped" : "Gained"}
            </div>
          </div>
          <div
            className={clsx(
              styles.graphBarItemStyle,
              styles.graphBarItemIndexStyle["last"]
            )}
            style={{
              height: `${transitionData.lastFrequencyRatio * 100}%`,
            }}
          />
        </>
      )}
      <div
        ref={currentBarRef}
        className={clsx(
          styles.graphBarItemStyle,
          styles.graphBarItemIndexStyle["current"]
        )}
        style={{
          height: `${frequencyRatio * 100}%`,
        }}
      >
        {frequency !== 0 && (
          <span ref={frequencyRef} className={styles.graphBarNumberStyle}>
            {frequency}
          </span>
        )}
      </div>
    </div>
  );
};
