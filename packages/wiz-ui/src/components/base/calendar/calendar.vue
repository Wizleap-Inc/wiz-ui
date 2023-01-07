<template>
  <table :class="calendarStyle">
    <td
      v-for="row in WEEK_LIST_JP"
      :class="calendarItemStyle['default']"
      :key="row"
    >
      {{ row }}
    </td>
    <tr v-for="(week, row) in calendars" :key="[week, row].join('-')">
      <td
        v-for="(day, col) in week"
        :key="[day, col].join('-')"
        :class="calendarItemStyle[getDateState(row, col)]"
        @click="updateSelectedDate(row, col, day)"
      >
        {{ day }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import {
  calendarStyle,
  calendarItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
import { computed, PropType } from "vue";

interface Emit {
  (e: "input", value: Date): void;
}
const emits = defineEmits<Emit>();

const props = defineProps({
  currentMonth: {
    type: Object as PropType<Date>,
    required: true,
  },
  value: {
    type: Object as PropType<Date>,
    required: true,
  },
  filledWeeks: {
    type: Boolean,
    required: false,
    default: false,
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

// class の定義
const getDateState = computed(() => (row: number, col: number) => {
  const pickedUpDate = new Date(
    props.currentMonth.getFullYear(),
    props.currentMonth.getMonth(),
    Number(calendars.value[row][col])
  );
  if (!isCurrentMonth(row, col)) return "default";
  if (pickedUpDate.toString() === props.value.toString()) return "selected";
  return "inCurrentMonth";
});

const updateSelectedDate = (row: number, col: number, day: string) => {
  if (isCurrentMonth(row, col)) {
    const selectedValue = new Date(
      props.currentMonth.getFullYear(),
      props.currentMonth.getMonth(),
      Number(day)
    );
    emits("input", selectedValue);
  }
};
</script>
