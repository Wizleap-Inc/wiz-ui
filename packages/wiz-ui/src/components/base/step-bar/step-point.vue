<template>
  <span :class="[styles.stepPointStyle]">
    <span :class="styles.stepPointValueStyle">
      <WizIcon
        :icon="WizICircleCheck"
        :size="'xl6'"
        :color="status === 'done' ? 'green.800' : 'gray.500'"
      />
    </span>
  </span>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import { PropType } from "vue";

import { WizIcon, WizICircleCheck } from "@/components";

import type { StepStatus } from "./types";

defineOptions({
  name: ComponentName.StepPoint,
});

defineProps({
  status: {
    type: String as PropType<StepStatus>,
    required: true,
  },
});
</script>
