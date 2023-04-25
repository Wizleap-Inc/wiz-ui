<template>
  <div
    :class="[styles.grid]"
    :style="{
      gridTemplateRows: `repeat(${
        (endHour - startHour + 1) * constants.SCHEDULE_STEPS_PER_HOUR
      }, 1fr)`,
      gridTemplateColumns: `repeat(${colsCount}, 1fr)`,
    }"
  >
    <WizScheduleCard
      v-for="schedule in schedules"
      :key="schedule.id"
      :text="schedule.text"
      :variant="schedule.variant"
      :gridRow="getGridRow(schedule.start, schedule.end, schedule.text) || ''"
      :gridColumn="`${schedule.col} / ${schedule.col + 1}`"
      :show="getGridRow(schedule.start, schedule.end, schedule.text) !== null"
    ></WizScheduleCard>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, computed } from "vue";

import { ScheduleTime, ScheduleItem } from "../types";

import { getSteppedTime } from "./time";

import { WizScheduleCard } from ".";

defineOptions({
  name: ComponentName.ScheduleGrid,
});

const props = defineProps({
  startHour: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
  schedules: {
    type: Array as PropType<ScheduleItem[]>,
    required: true,
  },
});

const colsCount = computed(() => {
  return Math.max(...props.schedules.map((schedule) => schedule.col));
});

const getRowFromTime = (time: ScheduleTime) => {
  return (
    time.hour * constants.SCHEDULE_STEPS_PER_HOUR +
    (time.minute / 60) * constants.SCHEDULE_STEPS_PER_HOUR
  );
};

const getGridRow = (start: ScheduleTime, end: ScheduleTime, name: string) => {
  if (start.hour < props.startHour) {
    console.warn(constants.WARN_SCHEDULE_START_HOUR(props.startHour, name));
    return null;
  }

  if (
    end.hour > props.endHour ||
    (end.hour === props.endHour && end.minute > 0)
  ) {
    console.warn(constants.WARN_SCHEDULE_END_HOUR(props.endHour, name));
    return null;
  }

  if (
    start.hour > end.hour ||
    (start.hour === end.hour && start.minute > end.minute)
  ) {
    console.warn(constants.WARN_SCHEDULE_START_LATER_THAN_END(name));
    return null;
  }

  const steppedStart = getSteppedTime(start, constants.SCHEDULE_STEPS_PER_HOUR);
  const steppedEnd = getSteppedTime(end, constants.SCHEDULE_STEPS_PER_HOUR);

  const startRow =
    getRowFromTime(steppedStart) -
    getRowFromTime({
      hour: props.startHour,
      minute: 0,
    });
  const endRow =
    getRowFromTime(steppedEnd) -
    getRowFromTime({
      hour: props.startHour,
      minute: 0,
    });

  if (startRow === endRow) {
    return `${startRow + 1} / ${endRow + 2}`;
  }

  return `${startRow + 1} / ${endRow + 1}`;
};
</script>
