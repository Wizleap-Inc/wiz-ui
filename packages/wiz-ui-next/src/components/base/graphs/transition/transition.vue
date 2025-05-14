<template>
  <Container :max-frequency="maxFrequency">
    <div :class="graphBodyStyle">
      <Bar
        v-for="(barData, i) in formattedBarData"
        :key="i"
        :label="barData.label"
        :is-first="i === 0"
        :frequency="barData.frequency"
        :last-frequency="barData.lastFrequency"
        :max-frequency="maxFrequency"
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
} from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";
import { computed, PropType } from "vue";

import Bar from "./bar.vue";
import Container from "./container.vue";
import { TransitionGraphData } from "./types";

defineOptions({
  name: ComponentName.TransitionGraph,
});

const props = defineProps({
  data: {
    type: Array as PropType<TransitionGraphData[]>,
    required: true,
  },
});

const maxFrequency = computed(() => {
  return Math.max(...props.data.map((item) => item.frequency));
});

const formattedBarData = computed(() =>
  props.data.map((item, i) => {
    return {
      label: item.label,
      frequency: item.frequency,
      lastFrequency: i === 0 ? item.frequency : props.data[i - 1].frequency,
    };
  })
);
</script>
