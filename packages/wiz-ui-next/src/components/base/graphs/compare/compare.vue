<template>
  <Container
    :maxFrequency="maxFrequency"
    :annotationUnit="(unitPosition === 'intersection' && unit) || undefined"
    :label-unit="(unitPosition === 'vertical' && unit) || undefined"
  >
    <div :class="[graphBodyStyle]">
      <Bar
        v-for="(barData, i) in formattedBarData"
        :label="barData.label"
        :isFirst="i === 0"
        :data="barData"
        :maxFrequency="maxFrequency"
        :key="barData.label"
        :barGap="barGap"
        :barGroupWidth="barGroupWidth"
        :theta="theta"
      />
    </div>
    <div :class="summaryLabelStyle">
      <slot />
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  graphBodyStyle,
  summaryLabelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/compare-graph.css";
import { computed, PropType } from "vue";

import Bar from "./bar.vue";
import Container from "./container.vue";
import { CompareGraphData } from "./types";

defineOptions({
  name: ComponentName.CompareGraph,
});

const props = defineProps({
  data: {
    type: Array as PropType<CompareGraphData[]>,
    required: true,
  },
  /** 縦軸の最大値を設定します。 */
  maxFrequency: {
    type: Number,
    required: false,
  },
  /** 縦軸の最大値をceilN桁で切り上げて設定します。 */
  ceilN: {
    type: Number,
    required: false,
    default: 0,
  },
  /** バーの間隔に影響します。0~1の値を指定してください。 */
  barGap: {
    type: Number,
    required: false,
    default: 0.1,
  },
  /** バーの太さに影響します。0~1の値を指定してください。 */
  barGroupWidth: {
    type: Number,
    required: false,
    default: 0.8,
  },
  /** 単位を指定してください。 */
  unit: {
    type: String,
    required: false,
  },
  /**
   * ラベルの単位の表示位置を指定します。
   * @param {String} unitPosition - ラベルの単位の表示位置を指定します。以下のいずれかの値を指定できます:
   *   - "vertical": 縦軸の目盛に対して単位を表示します。
   *   - "intersection": 縦軸と横軸が交わる位置に単位を表示します。
   *   - "no": 単位を表示しません。
   * @default "no"
   * @required false
   */
  unitPosition: {
    type: String as PropType<"vertical" | "intersection" | "no">,
    required: false,
    default: "no",
  },
  /**
   * 横軸ラベルを傾けるかを指定します。
   * @param isTilted
   * @default false
   */
  isTilted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const theta = computed(() => {
  return props.isTilted ? Math.PI / 4 : 0;
});

const maxFrequency = computed(() => {
  if (props.maxFrequency) return props.maxFrequency;
  const maxFreq = Math.max(
    ...props.data
      .map((item) => item.data)
      .flat()
      .map((item) => item.frequency)
  );
  const powerOfTen = Math.pow(10, props.ceilN);
  const ceiledFreq = Math.ceil(maxFreq / powerOfTen) * powerOfTen;
  return ceiledFreq;
});

const formattedBarData = computed(() =>
  props.data.map((item) => {
    return {
      label: item.label,
      data: item.data,
    };
  })
);
</script>
