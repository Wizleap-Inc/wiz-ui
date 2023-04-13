<template>
  <div :class="styles.MeterBarContainerStyle">
    <svg
      :class="styles.MeterBarSVGStyle"
      :viewBox="`0 0 ${styles.VIEW_BOX_SIZE} ${styles.VIEW_BOX_SIZE}`"
    >
      <path
        :class="styles.MeterBarBgStyle"
        :stroke-dasharray="`${styles.MAX_PERCENTAGE}, 100`"
        :stroke-width="styles.STROKE_WIDTH"
        :d="`M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
            a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
            a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${
          -1 * styles.DIAMETER
        }`"
        :transform="`rotate(${(-styles.MAX_PERCENTAGE * 360) / 100 / 2}, ${
          styles.HALF_VIEW_BOX_SIZE
        }, ${styles.HALF_VIEW_BOX_SIZE})`"
      />
      <path
        v-if="percentage > 0"
        :class="[styles.MeterBarStyle, strokeStyle[meterColor]]"
        :stroke-dasharray="`${displayPercentage * styles.MAX_PERCENTAGE}, 100`"
        :stroke-width="styles.STROKE_WIDTH"
        :d="`M${styles.HALF_VIEW_BOX_SIZE} ${styles.MARGIN_OF_CIRCLE}
              a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${styles.DIAMETER}
              a ${styles.RADIUS} ${styles.RADIUS} 0 0 1 0 ${
          -1 * styles.DIAMETER
        }`"
        :transform="`rotate(${(-styles.MAX_PERCENTAGE * 360) / 100 / 2}, ${
          styles.HALF_VIEW_BOX_SIZE
        }, ${styles.HALF_VIEW_BOX_SIZE})`"
      />
    </svg>
    <div :class="styles.MeterBarPercentageStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/meter-graph.css";
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
