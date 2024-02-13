<template>
  <div :class="[lineGraphBaseBgStyle, lineGraphBgStyle[bgStyle]]">
    <div :class="lineGraphBarStyle" :style="{ width: `${percentage}%` }" />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  lineGraphBaseBgStyle,
  lineGraphBgStyle,
  lineGraphBarStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.LineGraph,
});

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  hiddenBg: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const bgStyle = computed(() => {
  if (props.hiddenBg) return "hidden";
  return "default";
});
</script>
