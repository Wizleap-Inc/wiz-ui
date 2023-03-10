<template>
  <WizPopupContainer :expand="expand">
    <button
      :class="[
        rangeDatePickerStyle[disabled ? 'disabled' : 'active'],
        rangeDatePickerWidthStyle[expand ? 'expanded' : 'default'],
        inputBorderStyle[borderState],
      ]"
      :aria-label="ARIA_LABELS.RANGE_DATE_PICKER_INPUT"
      :disabled="disabled"
      @click="togglePopupOpen"
    >
      <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
      <span
        :class="
          rangeDatePickerInputTextStyle[
            modelValue.start ? 'selected' : 'default'
          ]
        "
        >{{
          modelValue.start ? formatDateToMD(modelValue.start) : "開始日"
        }}</span
      >
      <span :class="rangeDatePickerSeparatorStyle">-</span>
      <span
        :class="
          rangeDatePickerInputTextStyle[modelValue.end ? 'selected' : 'default']
        "
        >{{ modelValue.end ? formatDateToMD(modelValue.end) : "終了日" }}</span
      >
    </button>
    <WizPopup :isOpen="isPopupOpen" @onClose="isPopupOpen = false" gap="xs">
      <WizCard p="xs">
        <div :class="rangeDatePickerPopupStyle">
          <div :class="rangeDatePickerPopupCalendarsStyle">
            <div :class="rangeDatePickerPopupCalendarContainerStyle['left']">
              <div :class="rangeDatePickerPopupCalendarHeaderStyle">
                <button
                  :class="rangeDatePickerPopupCalendarHeaderButtonStyle"
                  :aria-label="ARIA_LABELS.MONTH_SELECTOR_PREV"
                  @click="moveToPrevMonth"
                >
                  <WizIcon size="md" color="inherit" :icon="WizIChevronLeft" />
                </button>
                <span :class="rangeDatePickerPopupCalendarMonthStyle">
                  {{ leftCalendarDate.getFullYear() }}年{{
                    leftCalendarDate.getMonth() + 1
                  }}月
                </span>
                <div :class="rangeDatePickerPopupCalendarHeaderSpacerStyle" />
              </div>
              <WizCalendar
                :currentMonth="leftCalendarDate"
                :activeDates="selectedDates"
                @click="handleDayClick"
              />
            </div>
            <div :class="rangeDatePickerPopupCalendarContainerStyle['right']">
              <div :class="rangeDatePickerPopupCalendarHeaderStyle">
                <div :class="rangeDatePickerPopupCalendarHeaderSpacerStyle" />
                <span :class="rangeDatePickerPopupCalendarMonthStyle">
                  {{ rightCalendarDate.getFullYear() }}年{{
                    rightCalendarDate.getMonth() + 1
                  }}月
                </span>
                <button
                  :class="rangeDatePickerPopupCalendarHeaderButtonStyle"
                  :aria-label="ARIA_LABELS.MONTH_SELECTOR_NEXT"
                  @click="moveToNextMonth"
                >
                  <WizIcon size="md" color="inherit" :icon="WizIChevronRight" />
                </button>
              </div>
              <WizCalendar
                :currentMonth="rightCalendarDate"
                :activeDates="selectedDates"
                @click="handleDayClick"
              />
            </div>
          </div>
        </div>
      </WizCard>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import {
  rangeDatePickerStyle,
  rangeDatePickerWidthStyle,
  rangeDatePickerSeparatorStyle,
  rangeDatePickerInputTextStyle,
  rangeDatePickerPopupCalendarContainerStyle,
  rangeDatePickerPopupCalendarHeaderStyle,
  rangeDatePickerPopupStyle,
  rangeDatePickerPopupCalendarsStyle,
  rangeDatePickerPopupCalendarMonthStyle,
  rangeDatePickerPopupCalendarHeaderButtonStyle,
  rangeDatePickerPopupCalendarHeaderSpacerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/range-date-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { formatDateToMD } from "@wizleap-inc/wiz-ui-utils";
import { PropType, ref, inject, computed } from "vue";

import {
  WizCalendar,
  WizCard,
  WizICalendar,
  WizIChevronLeft,
  WizIChevronRight,
  WizIcon,
  WizPopup,
  WizPopupContainer,
} from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { DateStatus } from "../../calendar/types";

import { DateRange } from "./types";

interface Emit {
  (e: "update:modelValue", value: DateRange): void;
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<DateRange>,
    required: true,
  },
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<Emit>();

type SelectState = "selecting" | "selected" | "none";

const isPopupOpen = ref(false);
const rightCalendarDate = ref(new Date());
const leftCalendarDate = computed(() => {
  const date = new Date(rightCalendarDate.value);
  date.setMonth(date.getMonth() - 1);
  return date;
});
const selectedState = ref<SelectState>("none");

const togglePopupOpen = () => {
  isPopupOpen.value = !isPopupOpen.value;
};

const moveToNextMonth = () => {
  rightCalendarDate.value = new Date(
    rightCalendarDate.value.setMonth(rightCalendarDate.value.getMonth() + 1)
  );
};

const moveToPrevMonth = () => {
  rightCalendarDate.value = leftCalendarDate.value;
};

const selectedDates = ref<DateStatus[]>([]);

const handleDayClick = (date: Date) => {
  if (selectedState.value === "selecting") {
    selectedState.value = "selected";
    let start = props.modelValue.start;
    let end = date;
    const dates = [];
    if (!start) return;

    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }

    const tomorrowOfStart = new Date(start);
    tomorrowOfStart.setDate(tomorrowOfStart.getDate() + 1);

    for (let d = tomorrowOfStart; d < end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    dates.forEach((d) => {
      selectedDates.value.push({
        date: d,
        state: "secondary",
      });
    });
    selectedDates.value.push({
      date,
      state: "primary",
    });
    emit("update:modelValue", {
      start,
      end,
    });
    return;
  }
  selectedState.value = "selecting";
  emit("update:modelValue", {
    start: date,
    end: null,
  });
  selectedDates.value = [];
  selectedDates.value.push({
    date,
    state: "primary",
  });
};

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const borderState = computed(() => {
  if (isError.value) return "error";
  if (isPopupOpen.value) return "active";
  return "default";
});
</script>
