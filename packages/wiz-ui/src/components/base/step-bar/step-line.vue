<template>
  <span
    class="wiz-progress-line"
    :class="[
      stepLineStyle,
      stepLineBackgroundStyle[active ? 'active' : 'inactive'],
      stepLineWidthStyle[isFirst ? 'first' : 'default'],
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  stepLineStyle,
  stepLineBackgroundStyle,
  stepLineWidthStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";

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
