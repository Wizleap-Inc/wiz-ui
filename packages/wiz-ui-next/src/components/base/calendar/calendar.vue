<template>
  <table :class="styles.calendarStyle">
    <td
      v-for="row in WEEK_LIST_JP"
      :class="styles.calendarCellStyle"
      :key="row"
    >
      <div :class="[styles.calendarItemStyle['dayOfWeek']]">
        {{ row }}
      </div>
    </td>
    <tr v-for="(week, row) in adjacentItems" :key="[week, row].join('-')">
      <td
        v-for="(adjacent, col) in week"
        :key="[adjacent.current.day, col].join('-')"
        :class="styles.calendarCellStyle"
      >
        <button
          type="button"
          v-if="adjacent.current.day"
          :class="styles.calendarItemCommonStyle"
          :aria-label="`${currentMonth.getFullYear()}年${
            currentMonth.getMonth() + 1
          }月${adjacent.current.day}日${
            adjacent.current.state === 'primary' ||
            adjacent.current.state === 'secondary'
              ? '-選択済み'
              : ''
          }`"
          :disabled="
            adjacent.current.state === 'outOfCurrentMonth' ||
            adjacent.current.state === 'disabledDate'
          "
          @click="updateSelectedDate(row, col, adjacent.current.day)"
        >
          <div
            :class="[
              styles.calendarItemContainerStyle,
              adjacent.current.state === 'primary' &&
                styles.calendarPrimaryItemContainerStyle,
            ]"
            :style="activeItemRadiusStyle(adjacent, isActiveDate)"
          >
            <div
              v-if="adjacent.current.state"
              :class="styles.calendarItemStyle[adjacent.current.state]"
              :style="
                primaryItemInnerRadiusStyle(
                  adjacent.current.state === 'primary'
                )
              "
            >
              <div
                :class="
                  isToday(row, col, adjacent.current.day)
                    ? styles.calendarItemInteractiveTodayStyle
                    : styles.calendarItemInteractiveStyle
                "
              >
                {{ adjacent.current.day }}
              </div>
            </div>
          </div>
        </button>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { THEME, WEEK_LIST_JP } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/calendar.css";
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
  // eslint-disable-next-line vue/prop-name-casing
  _today: {
    type: Date as PropType<Date>,
    required: false,
    default: new Date(),
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
type DateState =
  | "outOfCurrentMonth"
  | "disabledDate"
  | "primary"
  | "secondary"
  | "inCurrentMonth";
const adjacentItems = computed(() => {
  const tryGetDateState = (row: number, col: number) => {
    if (!calendars.value?.[row]?.[col]) return undefined;
    const state: DateState = getDateState.value(row, col);
    return state;
  };
  return calendars.value.map((week, row) => {
    return week.map((day, col) => {
      const current = tryGetDateState(row, col);
      // if (!current) throw Error("never");
      const top = tryGetDateState(row - 1, col);
      const bottom = tryGetDateState(row + 1, col);
      const left = tryGetDateState(row, col - 1);
      const right = tryGetDateState(row, col + 1);
      return {
        current: {
          state: current,
          day: day,
          date: new Date(
            props.currentMonth.getFullYear(),
            props.currentMonth.getMonth(),
            Number(day)
          ),
        },
        top,
        left,
        right,
        bottom,
      };
    });
  });
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

const isToday = (row: number, col: number, day: string) => {
  if (!isCurrentMonth(row, col)) return false;
  const date = new Date(
    props.currentMonth.getFullYear(),
    props.currentMonth.getMonth(),
    Number(day)
  );

  return date.toDateString() === (props._today || new Date()).toDateString();
};

const isActiveDate = computed(() => {
  const activeDatesSet = new Set(
    props.activeDates?.map((activeDate) => {
      return new Date(
        activeDate.date.getFullYear(),
        activeDate.date.getMonth(),
        activeDate.date.getDate()
      ).getTime();
    })
  );

  return (date: Date) =>
    activeDatesSet.has(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    );
});

type RadiusStyle = {
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
};

const activeItemRadiusStyle = (
  adjacent: {
    current: {
      state: DateState | undefined;
      date: Date;
    };
    top: DateState | undefined;
    left: DateState | undefined;
    right: DateState | undefined;
    bottom: DateState | undefined;
  },
  isActiveDate: (date: Date) => boolean
): RadiusStyle => {
  const { top, bottom, left, right, current } = adjacent;
  const { state: currentState, date: currentDate } = current;

  if (!currentState) {
    return {};
  }

  const calculateDate = (date: Date, offset: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  };

  const nextDate = calculateDate(currentDate, 1);
  const prevDate = calculateDate(currentDate, -1);

  const next = isActiveDate(nextDate);
  const prev = isActiveDate(prevDate);

  const radius = THEME.spacing.xs2;

  const radiusStyle = {
    borderTopLeftRadius:
      (!left && !top && radius) ||
      (!left && top === "primary" && radius) ||
      undefined,
    borderTopRightRadius: (!top && !right && radius) || undefined,
    borderBottomLeftRadius: (!bottom && !left && radius) || undefined,
    borderBottomRightRadius:
      (!right && !bottom && radius) ||
      (!right && bottom === "primary" && radius) ||
      undefined,
  };

  if (currentState === "primary") {
    return {
      borderTopLeftRadius: (!prev && "50%") || radiusStyle.borderTopLeftRadius,
      borderBottomLeftRadius:
        (!prev && "50%") || radiusStyle.borderBottomLeftRadius,
      borderTopRightRadius:
        (!next && "50%") || radiusStyle.borderTopRightRadius,
      borderBottomRightRadius:
        (!next && "50%") || radiusStyle.borderBottomRightRadius,
    };
  }

  return radiusStyle;
};

const primaryItemInnerRadiusStyle = (isPrimary: boolean) => ({
  borderRadius: isPrimary ? "50%" : undefined,
});
</script>
