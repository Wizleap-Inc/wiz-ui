<template>
  <span
    class="wiz-progress-line"
    :class="[
      styles.stepLineStyle,
      styles.stepLineBackgroundStyle[active ? 'active' : 'inactive'],
      styles.stepLineWidthStyle[isFirst ? 'first' : 'default'],
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";

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
