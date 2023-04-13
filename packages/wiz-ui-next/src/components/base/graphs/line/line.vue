<template>
  <div :class="styles.lineGraphBgStyle">
    <div
      :class="styles.lineGraphBarStyle"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/line-graph.css";

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
