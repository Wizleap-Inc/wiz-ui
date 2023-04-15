<template>
  <span
    :class="[
      styles.progressPointStyle,
      status !== 'none' && styles.progressPointVariantStyle[status],
    ]"
  >
    <span
      :class="[
        styles.progressPointValueStyle,
        styles.progressPointValueColorStyle[
          status === 'active' ? 'active' : 'inactive'
        ],
      ]"
    >
      {{ value }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import { PropType } from "vue";

import type { ProgressStatus } from "./types";

defineOptions({
  name: ComponentName.ProgressPoint,
});

defineProps({
  status: {
    type: String as PropType<ProgressStatus>,
    required: true,
  },
  value: {
    type: Number,
    required: false,
  },
});
</script>
