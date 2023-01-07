<template>
  <span
    :class="[
      progressPointStyle,
      status !== 'none' && progressPointVariantStyle[status],
    ]"
  >
    <span
      :class="[
        progressPointValueStyle,
        progressPointValueColorStyle[
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
import {
  progressPointStyle,
  progressPointValueColorStyle,
  progressPointValueStyle,
  progressPointVariantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
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
