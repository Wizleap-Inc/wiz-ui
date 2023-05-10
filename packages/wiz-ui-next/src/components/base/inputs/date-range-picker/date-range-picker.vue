<template>
  <WizPopupContainer :expand="expand">
    <button
      :class="[
        styles.bodyStyle[disabled ? 'disabled' : 'active'],
        styles.widthStyle[expand ? 'expanded' : 'default'],
        inputBorderStyle[borderState],
      ]"
      :aria-label="ARIA_LABELS.RANGE_DATE_PICKER_INPUT"
      :disabled="disabled"
      @click="setIsOpen(!isOpen)"
    >
      <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
      <span
        :class="
          styles.inputTextStyle[modelValue.start ? 'selected' : 'default']
        "
        >{{
          modelValue.start ? formatDateToMD(modelValue.start) : "開始日"
        }}</span
      >
      <span :class="styles.separatorStyle">-</span>
      <span
        :class="styles.inputTextStyle[modelValue.end ? 'selected' : 'default']"
        >{{ modelValue.end ? formatDateToMD(modelValue.end) : "終了日" }}</span
      >
    </button>
    <WizPopup
      :isOpen="!disabled && isOpen"
      @onClose="setIsOpen(false)"
      :is-direction-fixed="true"
    >
      <WizCard p="no">
        <div :class="styles.popupStyle">
          <div v-if="selectBoxOptions" :class="styles.popupHeaderStyle">
            <div
              :class="styles.popupHeaderSelectBoxContainerStyle"
              ref="selectBoxContainerRef"
            >
              <button
                :class="[
                  styles.popupHeaderSelectBoxStyle,
                  inputBorderStyle[isSelectBoxOpen ? 'active' : 'default'],
                ]"
                :aria-label="ARIA_LABELS.RANGE_DATE_PICKER_SELECT_BOX_INPUT"
                @click="toggleSelectBoxOpen"
              >
                {{ selectedOption?.label || "未選択" }}
                <WizIcon
                  size="xl"
                  color="gray.400"
                  :icon="isSelectBoxOpen ? WizIExpandLess : WizIExpandMore"
                />
              </button>
              <div
                v-if="isSelectBoxOpen"
                :class="styles.popupHeaderSelectBoxOptionsStyle"
              >
                <button
                  v-for="(option, index) in selectBoxOptions"
                  :key="index"
                  :class="styles.popupHeaderSelectBoxOptionStyle"
                  :aria-label="option.label"
                  @click="handleSelectBoxOptionClick(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
          <div :class="styles.popupCalendarsStyle">
            <div :class="styles.popupCalendarContainerStyle['left']">
              <div :class="styles.popupCalendarHeaderStyle">
                <button
                  :class="styles.popupCalendarHeaderButtonStyle"
                  :aria-label="ARIA_LABELS.MONTH_SELECTOR_PREV"
                  @click="moveToPrevMonth"
                >
                  <WizIcon size="md" color="inherit" :icon="WizIChevronLeft" />
                </button>
                <span :class="styles.popupCalendarMonthStyle">
                  {{ leftCalendarDate.getFullYear() }}年{{
                    leftCalendarDate.getMonth() + 1
                  }}月
                </span>
                <div :class="styles.popupCalendarHeaderSpacerStyle" />
              </div>
              <WizCalendar
                :currentMonth="leftCalendarDate"
                :activeDates="selectedDates"
                @click="handleDayClick"
              />
            </div>
            <div :class="styles.popupCalendarContainerStyle['right']">
              <div :class="styles.popupCalendarHeaderStyle">
                <div :class="styles.popupCalendarHeaderSpacerStyle" />
                <span :class="styles.popupCalendarMonthStyle">
                  {{ rightCalendarDate.getFullYear() }}年{{
                    rightCalendarDate.getMonth() + 1
                  }}月
                </span>
                <button
                  :class="styles.popupCalendarHeaderButtonStyle"
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-range-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { formatDateToMD } from "@wizleap-inc/wiz-ui-utils";
import { PropType, ref, inject, computed, onMounted } from "vue";

import {
  WizCalendar,
  WizCard,
  WizICalendar,
  WizIChevronLeft,
  WizIChevronRight,
  WizIcon,
  WizIExpandLess,
  WizIExpandMore,
  WizPopup,
  WizPopupContainer,
} from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { DateStatus, DateState } from "../../calendar/types";

import { DateRangePickerSelectBoxOption, DateRange } from "./types";

interface Emit {
  (e: "update:modelValue", value: DateRange): void;
  (e: "update:selectBoxValue", value: string): void;
  (e: "update:isOpen", value: boolean): void;
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
  selectBoxOptions: {
    type: Array as PropType<DateRangePickerSelectBoxOption[]>,
    required: false,
  },
  selectBoxValue: {
    type: String,
    required: false,
  },
  /**
   * カレンダー（Popup）の開閉状態を指定します。
   */
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<Emit>();

type SelectState = "selecting" | "selected" | "none";

const isSelectBoxOpen = ref(false);
const selectBoxContainerRef = ref<HTMLElement>();
const rightCalendarDate = ref(
  (() => {
    const [start, end] = [props.modelValue.start, props.modelValue.end];
    if (end) {
      return end;
    }
    if (start) {
      return new Date(
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate()
      );
    }
    return new Date();
  })()
);
const leftCalendarDate = computed(() => {
  const date = new Date(
    rightCalendarDate.value.getFullYear(),
    rightCalendarDate.value.getMonth() - 1,
    1
  );
  return date;
});
const selectedState = ref<SelectState>("none");

const setIsOpen = (value: boolean) => {
  emit("update:isOpen", value);
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

onMounted(() => {
  const [start, end] = [props.modelValue.start, props.modelValue.end];
  const setDateState = (date: Date, state: DateState) =>
    selectedDates.value.push({ date, state });
  if (!start) {
    if (end) {
      // start・endを入れ替える
      emit("update:modelValue", {
        start: end,
        end: null,
      });
      selectedState.value = "selecting";
      setDateState(end, "primary");
    }
    return;
  }
  if (end) {
    selectedState.value = "selected";
    const tomorrowOfStart = new Date(start);
    tomorrowOfStart.setDate(tomorrowOfStart.getDate() + 1);
    for (let d = tomorrowOfStart; d < end; d.setDate(d.getDate() + 1)) {
      setDateState(new Date(d), "secondary");
    }
    setDateState(start, "primary");
    setDateState(end, "primary");
  } else {
    selectedState.value = "selecting";
    setDateState(start, "primary");
  }
});

const toggleSelectBoxOpen = () => {
  isSelectBoxOpen.value = !isSelectBoxOpen.value;
};

const selectedOption = computed(() => {
  if (!props.selectBoxOptions) return undefined;
  return props.selectBoxOptions.find(
    (option) => option.value === props.selectBoxValue
  );
});

const handleSelectBoxOptionClick = (value: string) => {
  isSelectBoxOpen.value = false;
  emit("update:selectBoxValue", value);
};

// popup-containerの外をクリックしたときにハンドラ発火
useClickOutside(selectBoxContainerRef, () => {
  isSelectBoxOpen.value = false;
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const borderState = computed(() => {
  if (isError.value) return "error";
  if (props.isOpen) return "active";
  return "default";
});
</script>
