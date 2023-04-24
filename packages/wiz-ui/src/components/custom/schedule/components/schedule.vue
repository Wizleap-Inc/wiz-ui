<template>
  <div :class="[styles.schedule]">
    <WizScheduleSheet :startHour="startHour" :endHour="endHour" />
    <WizScheduleGrid
      :startHour="startHour"
      :endHour="endHour"
      :schedules="schedules"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, defineProps } from "vue";

import { Schedule } from "../types";

import { WizScheduleSheet, WizScheduleGrid } from ".";

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
    default: [],
  },
});

defineOptions({
  name: ComponentName.Schedule,
});
</script>
