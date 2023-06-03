import * as styles from "@wizleap-inc/wiz-ui-styles/bases/compare-graph.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, useEffect, useMemo, useRef } from "react";

import { CompareGraphData } from "./types";

type Props = {
  data: CompareGraphData;
  maxFrequency: number;
  barGap: number;
  barGroupWidth: number;
  /** バーの傾き(rad)を指定します。*/
  theta: number;
};

export const Bar: FC<Props> = ({
  data,
  maxFrequency,
  barGap,
  barGroupWidth,
  theta,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<Array<HTMLDivElement | null>>([]);
  const barFrequenciesRef = useRef<Array<HTMLSpanElement | null>>([]);

  const barDisplayData = useMemo(() => {
    const groupedData = data.data;
    const barWidthRatio = barGroupWidth / groupedData.length;

    return groupedData.map((data, i) => {
      const heightPercent = (data.frequency / maxFrequency) * 100;
      return {
        id: data.id,
        heightPercent,
        bgColorStyle: backgroundStyle[data.barColor ?? "green.800"],
        numberColorStyle: colorStyle[data.numberColor ?? "white.800"],
        frequency: data.frequency,
        elementStyle: {
          height: `${heightPercent}%`,
          width: `${barWidthRatio * (1 - barGap) * 100}%`,
          left: `${(barWidthRatio * (i * 2 + 1) - barGroupWidth) * 100}%`,
        },
      };
    });
  }, [barGap, barGroupWidth, data.data, maxFrequency]);

  useEffect(() => {
    // 配列の ref の数を是正
    barsRef.current = barsRef.current.slice(0, barDisplayData.length);
    barFrequenciesRef.current = barFrequenciesRef.current.slice(
      0,
      barDisplayData.length
    );
  }, [barDisplayData.length]);

  useEffect(() => {
    // ラベルの回転による位置調整を行う
    const labelElm = labelRef.current;
    const wrapperElm = wrapperRef.current;
    if (!labelElm || !wrapperElm) return;

    if (theta === 0) {
      // theta = 0 のときは中央寄せのみ
      labelElm.style.transform = "translateX(-50%)";
      return;
    }

    const updateLabelTransformStyle = () => {
      const labelHalfWidth = labelElm.clientWidth / 2;
      const rotatedLabelHalfWidth = Math.cos(theta) * labelHalfWidth;
      const groupHalfWidth = (wrapperElm.clientWidth * barGroupWidth) / 2;
      const translateX = Math.min(groupHalfWidth - rotatedLabelHalfWidth, 0);
      const translateY = labelHalfWidth * Math.abs(Math.sin(theta));
      labelElm.style.transform = `
        translateX(-50%)
        translate(${translateX}px, ${translateY}px)
        rotate(-${theta}rad)
      `;
    };

    const graphResizeObserver = new ResizeObserver(updateLabelTransformStyle);
    graphResizeObserver.observe(wrapperElm);

    return () => {
      graphResizeObserver.disconnect();
    };
  }, [barGroupWidth, theta]);

  useEffect(() => {
    const barElms = barsRef.current;
    const barFrequencyElms = barFrequenciesRef.current;
    if (!barElms || !barFrequencyElms) return;

    const updateBarItemCurrentHeight = () => {
      barElms.forEach((barElm, i) => {
        const barFrequencyElm = barFrequencyElms[i];
        if (!barFrequencyElm || !barElm) return;
        const verticalPadding = 8;
        if (
          barFrequencyElm.offsetHeight + verticalPadding * 2 <
          barElm.offsetHeight
        ) {
          // バー内部にラベルを表示
          barFrequencyElm.style.padding = `${verticalPadding}px 0`;
          return;
        }
        barFrequencyElm.style.padding = "0";
        if (barFrequencyElm.offsetHeight < barElm.offsetHeight) {
          // padding 調整してバー内部にラベルを表示
          barFrequencyElm.style.top =
            (barElm.offsetHeight - barFrequencyElm.offsetHeight) / 2 + "px";
          return;
        }
        // バー上部にラベルを表示
        barFrequencyElm.style.top = barFrequencyElm.offsetHeight * -1 + "px";
        barFrequencyElm.style.color = "#606166";
      });
    };

    const barItemCurrentResizeObserver = new ResizeObserver(
      updateBarItemCurrentHeight
    );
    barElms.forEach((elem) => {
      if (elem) barItemCurrentResizeObserver.observe(elem);
    });

    return () => {
      barItemCurrentResizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.graphBarStyle} ref={wrapperRef}>
      <span className={styles.graphBarLabelStyle} ref={labelRef}>
        {data.label}
      </span>
      {barDisplayData.map((item, i) => (
        <div
          key={item.id}
          className={clsx(styles.graphBarItemStyle, item.bgColorStyle)}
          style={item.elementStyle}
          ref={(ref) => {
            barsRef.current[i] = ref;
          }}
        >
          {item.heightPercent !== 0 && (
            <span
              className={clsx(
                styles.graphBarNumberStyle,
                item.numberColorStyle
              )}
              ref={(ref) => {
                barFrequenciesRef.current[i] = ref;
              }}
            >
              {item.frequency}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
