<template>
  <WizPopupContainer :width="computedWidth">
    <button
      type="button"
      :class="[
        styles.variantStyles[variant],
        styles.bodyStyle[disabled ? 'disabled' : 'active'],
        inputBorderStyle[borderState],
      ]"
      style="width: 100%"
      :aria-label="ARIA_LABELS.RANGE_DATE_PICKER_INPUT"
      :disabled="disabled"
      @click="setIsOpen(!isOpen)"
      @keydown.left="moveToPrevMonth"
      @keydown.right="moveToNextMonth"
    >
      <WizHStack gap="xs" align="center" height="100%" nowrap>
        <span>
          <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
        </span>
        <span
          :class="
            styles.inputTextStyle[
              (disabled && 'disabled') ||
                (modelValue.start && 'selected') ||
                'default'
            ]
          "
          >{{
            modelValue.start ? formatDate(modelValue.start) : "開始日"
          }}</span
        >
        <span :class="styles.separatorStyle">-</span>
        <span
          :class="
            styles.inputTextStyle[
              (disabled && 'disabled') ||
                (modelValue.end && 'selected') ||
                'default'
            ]
          "
          >{{ modelValue.end ? formatDate(modelValue.end) : "終了日" }}</span
        >
      </WizHStack>
      <button
        v-if="!disabled && !!modelValue.start"
        type="button"
        :class="styles.popupCalendarCancelIconStyle"
        :aria-label="ARIA_LABELS.RANGE_DATE_PICKER_CANCEL"
        @click="onClickCancel"
      >
        <WizIcon size="xl2" color="inherit" :icon="WizICancel" />
      </button>
    </button>
    <WizPopup
      :is-open="!disabled && isOpen"
      :is-direction-fixed="isDirectionFixed"
      @on-close="onClose"
    >
      <WizCard p="no">
        <div :class="styles.popupStyle">
          <div v-if="selectBoxOptions" :class="styles.popupHeaderStyle">
            <div
              ref="selectBoxContainerRef"
              :class="styles.popupHeaderSelectBoxContainerStyle"
            >
              <button
                type="button"
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
                  type="button"
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
                  type="button"
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
                :current-month="leftCalendarDate"
                :active-dates="selectedDates"
                :disabled-date="disabledDate"
                :filled-weeks="true"
                :_today="_today || new Date()"
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
                  type="button"
                  :class="styles.popupCalendarHeaderButtonStyle"
                  :aria-label="ARIA_LABELS.MONTH_SELECTOR_NEXT"
                  @click="moveToNextMonth"
                >
                  <WizIcon size="md" color="inherit" :icon="WizIChevronRight" />
                </button>
              </div>
              <WizCalendar
                :current-month="rightCalendarDate"
                :active-dates="selectedDates"
                :disabled-date="disabledDate"
                :filled-weeks="true"
                :_today="_today || new Date()"
                @click="handleDayClick"
              />
            </div>
          </div>
          <WizDivider color="gray.300" />
          <WizHStack p="sm" gap="sm" justify="end">
            <WizTextButton variant="sub" @click="onClose">
              {{ ARIA_LABELS.CANCEL }}
            </WizTextButton>
            <WizTextButton @click="onSubmit">
              {{ ARIA_LABELS.APPLY }}
            </WizTextButton>
          </WizHStack>
        </div>
      </WizCard>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-range-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, inject, PropType, ref } from "vue";

import {
  WizCalendar,
  WizCard,
  WizDivider,
  WizHStack,
  WizICalendar,
  WizICancel,
  WizIChevronLeft,
  WizIChevronRight,
  WizIcon,
  WizIExpandLess,
  WizIExpandMore,
  WizPopup,
  WizPopupContainer,
  WizTextButton,
} from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { DateState, DateStatus } from "../../calendar/types";

import { DateRange, DateRangePickerSelectBoxOption } from "./types";

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
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
    default: "20rem",
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
  variant: {
    type: String as PropType<"regular" | "mini">,
    required: false,
    default: "regular",
  },
  /**
   * カレンダー（Popup）の開閉状態を指定します。
   */
  isOpen: {
    type: Boolean,
    required: true,
  },
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
    default: () => false,
  },
  /**
   * @description 日付の表示形式をカスタマイズします。
   * @default (date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
   */
  formatDate: {
    type: Function as PropType<(date: Date) => string>,
    required: false,
    default: (date: Date) =>
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
  },
  // eslint-disable-next-line vue/prop-name-casing
  _today: {
    type: Date as PropType<Date>,
    required: false,
    default: new Date(),
  },
});

const emit = defineEmits<Emit>();

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const isSelectBoxOpen = ref(false);
const selectBoxContainerRef = ref<HTMLElement>();
const rightCalendarDate = ref(
  (() => {
    const [start, end] = [props.modelValue.start, props.modelValue.end];
    if (end) {
      return new Date(end);
    }
    if (start) {
      return new Date(start.getFullYear(), start.getMonth() + 1, 1);
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
const initializeRightCalendarDate = () => {
  rightCalendarDate.value = new Date();
  const [start, end] = [props.modelValue.start, props.modelValue.end];
  if (end) {
    rightCalendarDate.value = new Date(end);
  } else if (start) {
    rightCalendarDate.value = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      1
    );
  } else {
    rightCalendarDate.value = new Date();
  }
};

const setIsOpen = (value: boolean) => emit("update:isOpen", value);
const tempDateRange = ref(props.modelValue);

const moveToNextMonth = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
  rightCalendarDate.value = new Date(
    rightCalendarDate.value.setMonth(rightCalendarDate.value.getMonth() + 1)
  );
};

const moveToPrevMonth = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
  rightCalendarDate.value = leftCalendarDate.value;
};

const selectedDates = computed<DateStatus[]>(() => {
  const getDateStatus = (date: Date, state: DateState): DateStatus => ({
    date,
    state,
  });
  const [start, end] = [tempDateRange.value.start, tempDateRange.value.end];
  if (start && end) {
    const secondaries: DateStatus[] = [];
    const tomorrowOfStart = new Date(start);
    tomorrowOfStart.setDate(tomorrowOfStart.getDate() + 1);
    for (let d = tomorrowOfStart; d < end; d.setDate(d.getDate() + 1)) {
      secondaries.push(getDateStatus(new Date(d), "secondary"));
    }
    return [
      getDateStatus(start, "primary"),
      ...secondaries,
      getDateStatus(end, "primary"),
    ];
  }
  if (start) {
    return [getDateStatus(start, "primary")];
  }
  return [];
});

const handleDayClick = (date: Date) => {
  const [start, end] = [tempDateRange.value.start, tempDateRange.value.end];
  if (start && end) {
    tempDateRange.value = { start: date, end: null };
    return;
  }
  if (start) {
    const [nextStart, nextEnd] = start > date ? [date, start] : [start, date];
    tempDateRange.value = { start: nextStart, end: nextEnd };
    return;
  }
  tempDateRange.value = { start: date, end: null };
};

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
  if (props.isOpen && !props.disabled) return "active";
  return "default";
});

const onClickCancel = (e: MouseEvent) => {
  e.stopPropagation();
  tempDateRange.value = { start: null, end: null };
  initializeRightCalendarDate();
  emit("update:modelValue", tempDateRange.value);
  setIsOpen(false);
};

const onClose = () => {
  tempDateRange.value = props.modelValue;
  initializeRightCalendarDate();
  setIsOpen(false);
};

const onSubmit = () => {
  emit("update:modelValue", tempDateRange.value);
  setIsOpen(false);
};
</script>
