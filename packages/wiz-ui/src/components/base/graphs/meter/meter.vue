<template>
  <div :class="MeterBarContainerStyle">
    <svg
      :class="MeterBarSVGStyle"
      :viewBox="`0 -1 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE - 1}`"
    >
      <path
        :class="MeterBarBgStyle"
        :stroke-dasharray="`${MAX_PERCENTAGE}, 100`"
        :stroke-width="STROKE_WIDTH"
        :d="`M${HALF_VIEW_BOX_SIZE} ${MARGIN_OF_CIRCLE}
            a ${RADIUS} ${RADIUS} 0 0 1 0 ${DIAMETER}
            a ${RADIUS} ${RADIUS} 0 0 1 0 ${-1 * DIAMETER}`"
        :transform="`rotate(${
          (-MAX_PERCENTAGE * 360) / 100 / 2
        }, ${HALF_VIEW_BOX_SIZE}, ${HALF_VIEW_BOX_SIZE})`"
      />
      <path
        v-if="percentage > 0"
        :class="[MeterBarStyle, strokeStyle[meterColor]]"
        :stroke-dasharray="`${displayPercentage * MAX_PERCENTAGE}, 100`"
        :stroke-width="STROKE_WIDTH"
        :d="`M${HALF_VIEW_BOX_SIZE} ${MARGIN_OF_CIRCLE}
              a ${RADIUS} ${RADIUS} 0 0 1 0 ${DIAMETER}
              a ${RADIUS} ${RADIUS} 0 0 1 0 ${-1 * DIAMETER}`"
        :transform="`rotate(${
          (-MAX_PERCENTAGE * 360) / 100 / 2
        }, ${HALF_VIEW_BOX_SIZE}, ${HALF_VIEW_BOX_SIZE})`"
      />
    </svg>
    <div :class="MeterBarPercentageStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  MeterBarBgStyle,
  MeterBarContainerStyle,
  MeterBarSVGStyle,
  MeterBarPercentageStyle,
  MeterBarStyle,
  STROKE_WIDTH,
  VIEW_BOX_SIZE,
  HALF_VIEW_BOX_SIZE,
  RADIUS,
  DIAMETER,
  MARGIN_OF_CIRCLE,
  MAX_PERCENTAGE,
} from "@wizleap-inc/wiz-ui-styles/bases/meter-graph.css";
import { strokeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed } from "vue";

defineOptions({
  name: ComponentName.MeterGraph,
});

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});

const meterColor = computed(() => {
  if (props.percentage >= 75) return "green.700";
  if (props.percentage >= 50) return "blue.700";
  if (props.percentage >= 25) return "yellow.700";
  return "red.700";
});

const displayPercentage = computed(() => {
  if (props.percentage < 0) return 0;
  if (props.percentage > 100) return 1;
  return props.percentage / 100;
});
</script>
