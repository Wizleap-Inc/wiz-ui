<template>
  <div :class="styles.CircleBarContainerStyle">
    <svg
      :class="styles.CircleBarSVGStyle"
      :viewBox="`0 0 ${styles.VIEW_BOX_SIZE} ${styles.VIEW_BOX_SIZE}`"
    >
      <path
        :class="styles.CircleBarBgStyle"
        :stroke-width="styles.STROKE_WIDTH"
        :d="`M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
            a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
            a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${
          -1 * styles.DIAMETER
        }`"
      />
      <template v-for="(data, i) in percentagesForDisplay">
        <path
          v-if="data.percentage > 0"
          :class="styles.CircleBarStyle"
          :style="{
            stroke:
              styles.GRAPH_COLORS[i] ||
              styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
          }"
          :stroke-dasharray="`${data.percentage}, 100`"
          :stroke-width="styles.STROKE_WIDTH"
          :d="`M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
              a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
              a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${
            -1 * styles.DIAMETER
          }`"
          :transform="`rotate(${
            ((data.start + styles.STROKE_WIDTH / 2) * 360) / 100
          }, ${styles.HALF_VIEW_BOX_SIZE}, ${styles.HALF_VIEW_BOX_SIZE})`"
        />
      </template>
    </svg>
    <div :class="styles.CircleBarPercentageStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
import { computed, PropType } from "vue";

const props = defineProps({
  percentages: {
    type: Array as PropType<number[]>,
    required: true,
  },
});

const percentagesForDisplay = computed(() => {
  let startRotatedPercentage = 0;
  return props.percentages.map((percentage) => {
    const displayPercentageDegree = percentage;
    const before = startRotatedPercentage;
    startRotatedPercentage += displayPercentageDegree;
    return {
      percentage:
        displayPercentageDegree -
        (percentage < styles.STROKE_WIDTH ? percentage : styles.STROKE_WIDTH),
      start: before,
    };
  });
});
</script>
