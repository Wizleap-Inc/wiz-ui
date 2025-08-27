<template>
  <div :class="[lineGraphContainerStyle[size], lineGraphBgStyle[bgStyle]]">
    <div
      :class="[
        lineGraphBarSizeStyle[size],
        lineGraphBarColorStyle[activeColor],
      ]"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  lineGraphContainerStyle,
  lineGraphBgStyle,
  lineGraphBarSizeStyle,
  lineGraphBarColorStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";
import { computed, PropType } from "vue";

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
  activeColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "green.800",
  },
  size: {
    type: String as PropType<"sm" | "md">,
    required: false,
    default: "sm",
  },
});

const bgStyle = computed(() => {
  if (props.hiddenBg) return "hidden";
  return "default";
});
</script>
