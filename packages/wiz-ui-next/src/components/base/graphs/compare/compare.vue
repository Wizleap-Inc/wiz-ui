<template>
  <Container :maxFrequency="maxFrequency" :annotationUnit="annotationUnit">
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
  annotationUnit: {
    type: String,
    required: false,
  },
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
