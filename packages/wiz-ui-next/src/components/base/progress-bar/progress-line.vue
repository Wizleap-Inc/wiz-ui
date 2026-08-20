<template>
  <span
    class="wiz-progress-line"
    :class="[
      progressLineStyle,
      progressLineBackgroundStyle[state],
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
import { PropType } from "vue";

import type { ProgressState } from "./types";

defineOptions({
  name: ComponentName.ProgressLine,
});

defineProps({
  state: {
    type: String as PropType<ProgressState>,
    required: false,
    default: "inactive",
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
});
</script>
