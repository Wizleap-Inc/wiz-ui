<template>
  <div :class="styles.CircleGraphStyle">
    <Bar :percentages="data.map((item) => item.percentage)">
      <slot />
    </Bar>
    <div :class="styles.CircleGraphLabelContainerStyle">
      <div
        :class="styles.CircleGraphLabelStyle"
        v-for="(label, i) in data.map((item) => item.label)"
      >
        <span
          :class="[styles.CircleGraphLabelIconStyle]"
          :style="{
            backgroundColor:
              styles.GRAPH_COLORS[i] ||
              styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
          }"
        >
        </span>
        <span :class="[styles.CircleGraphLabelItemStyle]">
          {{ label }}
        </span>
      </div>
      <div :class="styles.CircleGraphLabelStyle">
        <span
          :class="[styles.CircleGraphLabelIconStyle]"
          :style="{
            backgroundColor:
              styles.GRAPH_COLORS[styles.GRAPH_COLORS.length - 1],
          }"
        >
        </span>
        <span :class="[styles.CircleGraphLabelItemStyle]">
          {{ otherLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
import { PropType } from "vue";

import Bar from "./bar.vue";
import { CircleGraphData } from "./types";

defineOptions({
  name: ComponentName.CircleGraph,
});

defineProps({
  otherLabel: {
    type: String,
    required: false,
    default: "その他",
  },
  data: {
    type: Array as PropType<CircleGraphData[]>,
    required: true,
  },
});
</script>
