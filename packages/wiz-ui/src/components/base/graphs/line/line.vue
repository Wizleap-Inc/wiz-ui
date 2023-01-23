<template>
  <div :class="lineGraphBgStyle">
    <div :class="lineGraphBarStyle" :style="{ width: `${percentage}%` }" />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  lineGraphBgStyle,
  lineGraphBarStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";

defineOptions({
  name: ComponentName.LineGraph,
});

defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});
</script>
