<template>
  <Container :maxFrequency="maxFrequency" :annotationUnit="annotationUnit">
    <div :class="[graphBodyStyle]">
      <Bar
        v-for="(barData, i) in formattedBarData"
        :label="barData.label"
        :isFirst="i === 0"
        :data="barData"
        :maxFrequency="maxFrequency"
        :key="i"
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
  return Math.max(
    ...props.data
      .map((item) => item.data)
      .flat()
      .map((item) => item.frequency)
  );
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
