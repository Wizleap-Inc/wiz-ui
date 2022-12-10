<template>
  <table class="wiz-calendar">
    <td v-for="row in calendarWeekList" class="wiz-calendar-item" :key="row">
      {{ row }}
    </td>
    <tr v-for="(i, row) in countWeekRow" :key="'week-' + row">
      <td
        v-for="(i, day) in 7"
        :key="'day-' + day"
        class="wiz-calendar-item-in-current-month"
      >
        {{ showCalendarDates[calendarIndex(row, day)] }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from "vue";

import { THEME } from "@/constants/styles";

interface Props {
  filledWeeks?: boolean;
  value: Date;
}

const props = withDefaults(defineProps<Props>(), {
  filledWeeks: false,
});

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
const countWeekRow = showCalendarDates.length / 7;

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
  color: v-bind(colorGray600);
  &-item {
    padding: v-bind(spacingXs2) v-bind(spacingXs);
    text-align: center;
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
