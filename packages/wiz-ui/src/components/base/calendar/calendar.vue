<template>
  <table class="wiz-calendar">
    <tr v-for="row in countWeekRow">
      <td class="wiz-calendar-item" v-for="day in 7">
        {{ showCalendarDays[calendarIndex(row - 1, day - 1)] }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, withDefaults } from "vue";

import { THEME } from "@/constants/styles";

interface Props {
  isShow?: boolean;
  current?: Date;
}
const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

const calendarWeekList = ["日", "月", "火", "水", "木", "金", "土"];

// currentShowDateTime(ここは後で props に変更する)
const currentShowDateTime = ref(new Date());

const currentShowYear = computed(() => currentShowDateTime.value.getFullYear());
const currentShowMonth = computed(() => currentShowDateTime.value.getMonth());

// 表示月の1日
const currentShowFirstDateTime = computed(
  () => new Date(currentShowYear.value, currentShowMonth.value, 1)
);
const currentShowFirstDay = currentShowFirstDateTime.value.getDay();

// 表示月の末日
const currentShowLastDateTime = computed(
  () => new Date(currentShowYear.value, currentShowMonth.value + 1, 0)
);
const currentShowLastDate = currentShowLastDateTime.value.getDate();
const currentShowLastDay = currentShowLastDateTime.value.getDay();

const pastMonthLastDay = computed(() =>
  new Date(currentShowYear.value, currentShowMonth.value, 0).getDate()
);

// 週のセット
const pastMonthDays = [...Array(currentShowFirstDay)].map((_, index) =>
  props.isShow ? String(pastMonthLastDay.value - index + 1) : ""
);
const currentMonthDays = [...Array(currentShowLastDate)].map((key, index) =>
  String(index + 1)
);
const nextMonthDays = [...Array(6 - currentShowLastDay)].map((_, index) =>
  props.isShow ? String(index + 1) : ""
);
const showCalendarDays = calendarWeekList.concat(
  pastMonthDays,
  currentMonthDays,
  nextMonthDays
);

const countWeekRow = showCalendarDays.length / 7;
const calendarIndex = (row: number, i: number) => row * 7 + i;

// 以下、Style の定義

const colorGray600 = THEME.color.gray["600"];
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
}
</style>
