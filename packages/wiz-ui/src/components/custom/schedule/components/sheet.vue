<template>
  <table :class="[styles.sheet]">
    <tbody>
      <tr v-for="i in endHour - startHour + 1" :key="i" :class="styles.cols">
        <td :class="styles.time">
          {{ formatNumHourToTime(startHour + i - 1) }}
        </td>
        <td :class="styles.timeSpace"></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as constants from "@wizleap-inc/wiz-ui-constants/component/custom/schedule";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/schedule.css";
import { formatNumHourToTime } from "@wizleap-inc/wiz-ui-utils";

const props = defineProps({
  startHour: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
});

defineOptions({
  name: ComponentName.ScheduleSheet,
});

if (props.startHour > props.endHour) {
  console.warn(
    constants.WARN_SCHEDULE_NEGATIVE_RANGE(props.startHour, props.endHour)
  );
}

if (
  props.startHour < constants.MIN_SCHEDULE_HOUR ||
  props.startHour > constants.MAX_SCHEDULE_HOUR
) {
  console.warn(constants.WARN_SCHEDULE_OUT_OF_RANGE("start", props.startHour));
}

if (
  props.endHour < constants.MIN_SCHEDULE_HOUR ||
  props.endHour > constants.MAX_SCHEDULE_HOUR
) {
  console.warn(constants.WARN_SCHEDULE_OUT_OF_RANGE("end", props.endHour));
}
</script>
