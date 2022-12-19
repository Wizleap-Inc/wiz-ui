<template>
  <table class="wiz-calendar">
    <td
      v-for="row in WEEK_LIST_JP"
      class="wiz-calendar-item wiz-calendar-item-default"
      :key="row"
    >
      {{ row }}
    </td>
    <tr v-for="(week, row) in calendars" :key="row">
      <td
        v-for="(day, col) in week"
        :key="col"
        :class="['wiz-calendar-item', calendarItemColor(row, col)]"
        @click="updateSelectedDate(row, col, day)"
      >
        {{ day }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { THEME, WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import { withDefaults, defineProps, defineEmits, computed } from "vue";

interface Props {
  filledWeeks?: boolean;
  currentMonth: Date;
  value: Date;
  period?: "start" | "end";
  otherPeriod?: Date;
}

interface Emit {
  (e: "input", value: Date): void;
}
const emits = defineEmits<Emit>();

const props = withDefaults(defineProps<Props>(), {
  filledWeeks: false,
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

// class の定義
const calendarItemColor = computed(() => (row: number, col: number) => {
  const pickedUpDate = new Date(
    props.currentMonth.getFullYear(),
    props.currentMonth.getMonth(),
    Number(calendars.value[row][col])
  );
  if (!isCurrentMonth(row, col)) return "wiz-calendar-item-default";
  if (isActive(pickedUpDate)) return "wiz-calendar-item-active";
  if (isHover(pickedUpDate)) return "wiz-calendar-item-hover";
  return "wiz-calendar-item-in-current-month";
});

const isHover = (pickedUpDate: Date) => {
  return false;
};

const isActive = (pickedUpDate: Date) => {
  return false;
};

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
    padding: v-bind(spacingXs2) v-bind(spacingXs);
    text-align: center;
    border-radius: v-bind(spacingXs2);

    &-default {
      color: v-bind(colorGray600);
    }

    &-hover {
      background-color: v-bind(colorGreen300);
      color: v-bind(colorGreen800);
    }

    &-active {
      background-color: v-bind(colorGreen800);
      color: v-bind(colorWhite800);
    }

    &-in-current-month {
      color: v-bind(colorGray700);
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
}
</style>
