<template>
  <Container :maxFrequency="maxFrequency">
    <div :class="[graphBodyStyle]">
      <Bar
        v-for="(barData, i) in formattedBarData"
        :label="barData.label"
        :isFirst="i === 0"
        :data="barData"
        :maxFrequency="maxFrequency"
        :key="i"
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
