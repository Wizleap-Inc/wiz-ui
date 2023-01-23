<template>
  <div :class="CircleBarContainerStyle">
    <svg
      :class="CircleBarSVGStyle"
      :viewBox="`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`"
    >
      <path
        :class="CircleBarBgStyle"
        :stroke-width="STROKE_WIDTH"
        :d="`M${HALF_VIEW_BOX_SIZE} ${MARGIN_OF_CIRCLE}
            a ${RADIUS} ${RADIUS} 0 0 1 0 ${DIAMETER}
            a ${RADIUS} ${RADIUS} 0 0 1 0 ${-1 * DIAMETER}`"
      />
      <template v-for="(data, i) in percentagesForDisplay">
        <path
          v-if="data.percentage > 0"
          :class="CircleBarStyle"
          :style="{
            stroke: GRAPH_COLORS[i] || GRAPH_COLORS[GRAPH_COLORS.length - 1],
          }"
          :stroke-dasharray="`${data.percentage}, 100`"
          :stroke-width="STROKE_WIDTH"
          :d="`M${HALF_VIEW_BOX_SIZE} ${MARGIN_OF_CIRCLE}
              a ${RADIUS} ${RADIUS} 0 0 1 0 ${DIAMETER}
              a ${RADIUS} ${RADIUS} 0 0 1 0 ${-1 * DIAMETER}`"
          :transform="`rotate(${
            ((data.start + STROKE_WIDTH / 2) * 360) / 100
          }, ${HALF_VIEW_BOX_SIZE}, ${HALF_VIEW_BOX_SIZE})`"
        />
      </template>
    </svg>
    <div :class="CircleBarPercentageStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CircleBarBgStyle,
  CircleBarContainerStyle,
  CircleBarSVGStyle,
  CircleBarPercentageStyle,
  CircleBarStyle,
  GRAPH_COLORS,
  STROKE_WIDTH,
  VIEW_BOX_SIZE,
  HALF_VIEW_BOX_SIZE,
  RADIUS,
  DIAMETER,
  MARGIN_OF_CIRCLE,
} from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
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
        (percentage < STROKE_WIDTH ? percentage : STROKE_WIDTH),
      start: before,
    };
  });
});
</script>
