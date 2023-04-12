<template>
  <div :class="[styles.card[variant]]" :style="{ gridRow, gridColumn }">
    {{ showText ? text : "" }}
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, computed } from "vue";

import { ScheduleCardVariant } from "../types";

const props = defineProps({
  variant: {
    type: String as PropType<ScheduleCardVariant>,
    default: "primary",
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  gridRow: {
    type: String,
    required: true,
  },
  gridColumn: {
    type: String,
    required: true,
  },
});

defineOptions({
  name: ComponentName.ScheduleCard,
});

const showText = computed(() => {
  const [start, end] = props.gridRow
    .split("/")
    .map((x) => x.trim())
    .map(Number);
  return end - start > 2;
});
</script>
