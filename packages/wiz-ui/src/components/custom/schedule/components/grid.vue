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
      v-for="schedule in displaySchedules"
      :key="schedule.id"
      :text="schedule.text"
      :variant="schedule.variant"
      :gridRow="schedule.gridRow"
      :gridColumn="schedule.gridColumn"
    ></WizScheduleCard>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { PropType, computed } from "vue";

import { Schedule, ScheduleItem } from "../types";

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
  colsCount: {
    type: Number,
    required: true,
  },
  schedules: {
    type: Array as PropType<Schedule>,
    required: true,
  },
});

interface GridProps {
  gridRow: string;
  gridColumn: string;
}

type DisplayScheduleItem = ScheduleItem & GridProps;

const displaySchedules = computed(() => {
  return props.schedules
    .map((schedule) => {
      const startHour = schedule.start.hour;
      const endHour = schedule.end.hour;

      // 設定した範囲飛び越えた瞬間削除
      if (startHour < props.startHour || endHour > props.endHour)
        return undefined;

      const startMinute = Math.floor(schedule.start.minute / 15) * 15;
      const endMinute = Math.floor(schedule.end.minute / 15) * 15;

      // 設定した範囲飛び越えた瞬間削除
      if (
        startMinute < 0 ||
        startMinute > 45 ||
        endMinute < 0 ||
        endMinute > 45
      )
        return undefined;

      const startRow =
        (startHour - props.startHour) * constants.SCHEDULE_STEPS_PER_HOUR +
        startMinute / 15 +
        1;

      const endRow =
        (endHour - props.startHour) * constants.SCHEDULE_STEPS_PER_HOUR +
        endMinute / 15 +
        1;

      const day = 0;

      if (startHour * 60 + startMinute > endHour * 60 + endMinute) {
        return undefined;
      }

      const gridProps: GridProps = {
        gridRow: `${startRow} / ${endRow}`,
        gridColumn: `${day + 1} / ${day + 2}`,
      };

      return {
        ...schedule,
        ...gridProps,
      };
    })
    .filter((x): x is DisplayScheduleItem => x !== undefined);
});
</script>
