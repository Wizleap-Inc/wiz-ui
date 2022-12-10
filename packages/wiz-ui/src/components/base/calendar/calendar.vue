<template>
  <table class="wiz-calendar">
    <td v-for="row in calendarWeekList" class="wiz-calendar-item" :key="row">
      {{ row }}
    </td>
    <tr v-for="(i, row) in countWeekRow" :key="'week-' + row">
      <td
        v-for="(i, day) in 7"
        :key="'day-' + day"
        :class="`${isCurrentMonthDateClass(row, day)}`"
        @click="updateSelectedDate(calendarIndex(row, day))"
      >
        {{ showCalendarDates[calendarIndex(row, day)] }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import {
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  watch,
  toRefs,
} from "vue";

import { THEME } from "@/constants/styles";

interface Props {
  filledWeeks?: boolean;
  value: Date;
}

interface Emit {
  (e: "input", value: Date): void;
}
const emits = defineEmits<Emit>();

const props = withDefaults(defineProps<Props>(), {
  filledWeeks: false,
});
const { value } = toRefs(props);

const calendarWeekList = ["日", "月", "火", "水", "木", "金", "土"];

const currentShowYear = computed(() => props.value.getFullYear()).value;
const currentShowMonth = computed(() => props.value.getMonth()).value;
const currentShowDate = computed(() => props.value.getDate()).value;

// 表示月の 1日（ついたち）
const currentShowFirstDateTime = new Date(currentShowYear, currentShowMonth, 1);
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
const currentMonthDates = [...Array(currentShowMonthLastDate)].map(
  (key, index) => String(index + 1)
);
const nextMonthDates = [...Array(6 - currentShowMonthLastDay)].map((_, index) =>
  props.filledWeeks ? String(index + 1) : ""
);
const showCalendarDates = pastMonthDates.concat(
  currentMonthDates,
  nextMonthDates
);
const updateSelectedDate = (selectedIndex: number) => {
  if (isCurrentMonth(selectedIndex)) {
    const selectedDate = Number(showCalendarDates[selectedIndex]);
    const updateValue = new Date(
      currentShowYear,
      currentShowMonth,
      selectedDate
    );
    emits("input", updateValue);
  }
};
const countWeekRow = showCalendarDates.length / 7;

// class の定義
const isCurrentMonthDateClass = computed(() => (row: number, day: number) => {
  const selectedDateIndex = calendarIndex(row, day);
  if (selectedDateIndex === selectDate.value)
    return "wiz-calendar-item-selected";
  return isCurrentMonth(selectedDateIndex)
    ? "wiz-calendar-item-in-current-month"
    : "wiz-calendar-item";
});

// 選択した値がアクティブになるようにする
const selectDate = ref(currentShowFirstDay + currentShowDate - 1);
watch(value, (newVal) => {
  selectDate.value = currentShowFirstDay + newVal.getDate() - 1;
});

// カレンダーの配列におけるIndex
const calendarIndex = (row: number, index: number) => {
  return row * 7 + index;
};

// 選択した日が表示月に含まれるかどうか
const isCurrentMonth = (index: number) => {
  return (
    currentShowFirstDay <= index &&
    index < currentShowFirstDay + currentShowMonthLastDate
  );
};

// 以下、Style の定義
const colorWhite800 = THEME.color.white["800"];
const colorGray600 = THEME.color.gray["600"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];
const fontSizeXs2 = THEME.fontSize.xs2;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
</script>

<style lang="scss" scoped>
.wiz-calendar {
  font-size: v-bind(fontSizeXs2);
  &-item {
    color: v-bind(colorGray600);
    padding: v-bind(spacingXs2) v-bind(spacingXs);
    text-align: center;
  }
  &-item-selected {
    padding: v-bind(spacingXs2) v-bind(spacingXs);
    text-align: center;
    background-color: v-bind(colorGreen800);
    color: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
  }
  &-item-in-current-month {
    padding: v-bind(spacingXs2) v-bind(spacingXs);
    text-align: center;
    color: v-bind(colorGray700);

    border-radius: v-bind(spacingXs2);
    cursor: pointer;

    &:hover {
      background-color: v-bind(colorGreen300);
      color: v-bind(colorGreen800);
    }
    &:active {
      background-color: v-bind(colorGreen800);
      color: v-bind(colorWhite800);
    }
  }
}
</style>
