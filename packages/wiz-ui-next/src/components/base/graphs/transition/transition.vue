<template>
  <Container :maxFrequency="maxFrequency">
    <div :class="styles.graphBodyStyle">
      <Bar
        v-for="(barData, i) in formattedBarData"
        :label="barData.label"
        :isFirst="i === 0"
        :frequency="barData.frequency"
        :lastFrequency="barData.lastFrequency"
        :maxFrequency="maxFrequency"
        :key="i"
      />
    </div>
    <div :class="styles.summaryLabelStyle">
      <slot />
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";
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
