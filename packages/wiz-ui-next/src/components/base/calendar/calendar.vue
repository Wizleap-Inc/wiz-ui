<template>
  <table :class="calendarStyle">
    <td v-for="row in WEEK_LIST_JP" :class="calendarCellStyle" :key="row">
      <div :class="[calendarItemCommonStyle, calendarItemStyle['dayOfWeek']]">
        {{ row }}
      </div>
    </td>
    <tr v-for="(week, row) in calendars" :key="[week, row].join('-')">
      <td
        v-for="(day, col) in week"
        :key="[day, col].join('-')"
        :class="calendarCellStyle"
      >
        <button
          v-if="day"
          :class="[
            calendarItemCommonStyle,
            calendarItemStyle[getDateState(row, col)],
          ]"
          :aria-label="`${currentMonth.getFullYear()}年${
            currentMonth.getMonth() + 1
          }月${day}日${
            getDateState(row, col) === 'primary' ||
            getDateState(row, col) === 'secondary'
              ? '-選択済み'
              : ''
          }`"
          :disabled="
            getDateState(row, col) === 'outOfCurrentMonth' ||
            getDateState(row, col) === 'disabledDate'
          "
          @click="updateSelectedDate(row, col, day)"
        >
          {{ day }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import {
  calendarCellStyle,
  calendarItemCommonStyle,
  calendarItemStyle,
  calendarStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import { PropType, computed } from "vue";

import { DateStatus } from "./types";

interface Emit {
  (e: "click", value: Date): void;
}
const emits = defineEmits<Emit>();

const props = defineProps({
  currentMonth: {
    type: Date as PropType<Date>,
    required: false,
    default: new Date(),
  },
  activeDates: {
    type: Array as PropType<DateStatus[]>,
    required: false,
    default: () => [],
  },
  filledWeeks: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * @description 日付が無効かどうかを判定する関数です。無効な日付はクリック不可です。
   * @param date
   * @returns {boolean} `true`: 無効な日付, `false`: 有効な日付
   */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
    default: () => false,
  },
});

const calendars = computed(() => {
  const showCalendars: Array<Array<string>> = [];
  const currentShowYear = props.currentMonth.getFullYear();
  const currentShowMonth = props.currentMonth.getMonth();

  // 表示月の 1日（ついたち）
  const currentShowFirstDateTime = new Date(
    currentShowYear,
    currentShowMonth,
    1
  );
  const currentShowFirstDay = currentShowFirstDateTime.getDay();

  // 表示月の末日
  const currentShowMonthLastDateTime = new Date(
    currentShowYear,
    currentShowMonth + 1,
    0
  );
  const currentShowMonthLastDate = currentShowMonthLastDateTime.getDate();
  const currentShowMonthLastDay = currentShowMonthLastDateTime.getDay();

  // 表示月の一月前が何日あったか
  const pastMonthLastDay = new Date(
    currentShowYear,
    currentShowMonth,
    0
  ).getDate();

  // カレンダーに表示する日付
  const pastMonthDates = [...Array(currentShowFirstDay)]
    .map((_, index) =>
      props.filledWeeks ? String(pastMonthLastDay - index) : ""
    )
    .reverse();
  const currentMonth = [...Array(currentShowMonthLastDate)].map((key, index) =>
    String(index + 1)
  );
  const nextMonthDates = [...Array(6 - currentShowMonthLastDay)].map(
    (_, index) => (props.filledWeeks ? String(index + 1) : "")
  );
  const showCalendarDates = [
    ...pastMonthDates,
    ...currentMonth,
    ...nextMonthDates,
  ];
  for (let i = 0; i < showCalendarDates.length / 7; i++) {
    showCalendars.push(showCalendarDates.slice(i * 7, (i + 1) * 7));
  }

  return showCalendars;
});

const isCurrentMonth = (row: number, col: number) => {
  const currentShowYear = props.currentMonth.getFullYear();
  const currentShowMonth = props.currentMonth.getMonth();

  // 表示月の 1日（ついたち）
  const currentShowFirstDateTime = new Date(
    currentShowYear,
    currentShowMonth,
    1
  );
  const currentShowFirstDay = currentShowFirstDateTime.getDay();

  // 表示月の末日
  const currentShowLastDateTime = new Date(
    currentShowYear,
    currentShowMonth + 1,
    0
  );
  const currentShowLastDay = currentShowLastDateTime.getDay();

  // 初週、最終週で表示付きが含まれないかどうかを返す
  return !(
    (row === 0 && col < currentShowFirstDay) ||
    (row === calendars.value.length - 1 && currentShowLastDay < col)
  );
};

const getDateState = computed(() => (row: number, col: number) => {
  const pickedUpDate = new Date(
    props.currentMonth.getFullYear(),
    props.currentMonth.getMonth(),
    Number(calendars.value[row][col])
  );
  if (!isCurrentMonth(row, col)) return "outOfCurrentMonth";
  if (props.disabledDate(pickedUpDate)) return "disabledDate";
  const hitDate = props.activeDates.find(
    (dateState) =>
      dateState.date.getFullYear() === pickedUpDate.getFullYear() &&
      dateState.date.getMonth() === pickedUpDate.getMonth() &&
      dateState.date.getDate() === pickedUpDate.getDate()
  );
  if (hitDate) {
    return hitDate.state;
  }
  return "inCurrentMonth";
});

const updateSelectedDate = (row: number, col: number, day: string) => {
  if (isCurrentMonth(row, col)) {
    const selectedValue = new Date(
      props.currentMonth.getFullYear(),
      props.currentMonth.getMonth(),
      Number(day)
    );
    emits("click", selectedValue);
  }
};
</script>
