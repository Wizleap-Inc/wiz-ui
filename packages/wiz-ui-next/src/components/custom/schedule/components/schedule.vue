<template>
  <div :class="[styles.schedule]">
    <WizScheduleSheet :start-hour="startHour" :end-hour="endHour" />
    <WizScheduleGrid
      :start-hour="startHour"
      :end-hour="endHour"
      :schedules="schedules"
      @schedule-click="emits('scheduleClick', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, defineProps } from "vue";

import { Schedule } from "../types";

import { WizScheduleGrid, WizScheduleSheet } from ".";

defineProps({
  startHour: {
    type: Number,
    required: false,
    default: constants.DEFAULT_SCHEDULE_HOUR_START,
  },
  endHour: {
    type: Number,
    required: false,
    default: constants.DEFAULT_SCHEDULE_HOUR_END,
  },
  schedules: {
    type: Array as PropType<Schedule>,
    required: false,
    default: () => [],
  },
});

defineOptions({
  name: ComponentName.Schedule,
});

interface Emits {
  (e: "scheduleClick", id: string): void;
}

const emits = defineEmits<Emits>();
</script>
