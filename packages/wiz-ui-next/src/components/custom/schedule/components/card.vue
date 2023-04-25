<template>
  <div
    :class="[styles.card[variant]]"
    :style="{ gridRow, gridColumn }"
    v-show="show"
    @click="emits('scheduleClick', id)"
  >
    {{ displayText }}
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, computed } from "vue";

import { ScheduleCardVariant } from "../types";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
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
  show: {
    type: Boolean,
    required: false,
    default: true,
  },
});

defineOptions({
  name: ComponentName.ScheduleCard,
});

interface Emits {
  (e: "scheduleClick", id: string): void;
}

const emits = defineEmits<Emits>();

const displayText = computed(() => {
  const [start, end] = props.gridRow
    .split("/")
    .map((x) => x.trim())
    .map(Number);
  return end - start > 2 ? props.text : "";
});
</script>
