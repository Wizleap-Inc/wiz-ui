<template>
  <span
    class="wiz-progress-line"
    :class="[
      progressLineStyle,
      progressLineBackgroundStyle[active ? 'active' : 'inactive'],
      progressLineWidthStyle[isFirst ? 'first' : 'default'],
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  progressLineStyle,
  progressLineBackgroundStyle,
  progressLineWidthStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";

defineOptions({
  name: ComponentName.ProgressLine,
});

defineProps({
  active: {
    type: Boolean,
    required: false,
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
});
</script>
