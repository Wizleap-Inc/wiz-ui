<template>
  <div :class="CircleGraphStyle">
    <Bar :percentages="data.map((item) => item.percentage)">
      <slot />
    </Bar>
    <div :class="CircleGraphLabelContainerStyle">
      <div
        :class="CircleGraphLabelStyle"
        v-for="(label, i) in data.map((item) => item.label)"
      >
        <span
          :class="[CircleGraphLabelIconStyle]"
          :style="{
            backgroundColor:
              GRAPH_COLORS[i] || GRAPH_COLORS[GRAPH_COLORS.length - 1],
          }"
        >
        </span>
        <span :class="[CircleGraphLabelItemStyle]">
          {{ label }}
        </span>
      </div>
      <div :class="CircleGraphLabelStyle">
        <span
          :class="[CircleGraphLabelIconStyle]"
          :style="{
            backgroundColor: GRAPH_COLORS[GRAPH_COLORS.length - 1],
          }"
        >
        </span>
        <span :class="[CircleGraphLabelItemStyle]">
          {{ otherLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  CircleGraphStyle,
  CircleGraphLabelStyle,
  CircleGraphLabelContainerStyle,
  CircleGraphLabelItemStyle,
  CircleGraphLabelIconStyle,
  GRAPH_COLORS,
} from "@wizleap-inc/wiz-ui-styles/bases/circle-graph.css";
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
