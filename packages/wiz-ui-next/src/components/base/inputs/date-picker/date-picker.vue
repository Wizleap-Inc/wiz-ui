<template>
  <WizPopupContainer>
    <button
      :class="[
        datePickerStyle,
        datePickerVariantStyle[variant],
        inputBorderStyle[borderState],
      ]"
      :style="{
        width,
      }"
      :aria-label="ARIA_LABELS.DATE_PICKER_INPUT"
      @click="setIsOpen(!isOpen)"
    >
      <WizHStack gap="xs" align="center" height="100%">
        <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
        <span>{{ parseValue(calendarValue) || placeholder }}</span>
      </WizHStack>
    </button>
    <WizPopup :isOpen="!disabled && isOpen" @onClose="setIsOpen(false)">
      <div :class="datePickerSelectorStyle">
        <WizHStack align="center" my="xs2" px="xs" justify="between">
          <WizHStack align="center" justify="between" gap="xs2">
            <WizText as="span" fontSize="xs" line-height="lg" color="gray.700">
              {{ currentMonth.getFullYear() }}年
            </WizText>
            <WizVStack>
              <button
                :aria-label="ARIA_LABELS.YEAR_SELECTOR_NEXT"
                :class="[datePickerYearSelectorItemStyle]"
                @click="clickToNextYear"
              >
                <WizIArrowDropUp
                  :class="[
                    fillStyle['gray.700'],
                    fontSizeStyle['xs2'],
                    datePickerArrowIconStyle,
                  ]"
                />
              </button>
              <button
                :aria-label="ARIA_LABELS.YEAR_SELECTOR_PREV"
                :class="[datePickerYearSelectorItemStyle]"
                @click="clickToPreviousYear"
              >
                <WizIArrowDropDown
                  :class="[
                    fillStyle['gray.700'],
                    fontSizeStyle['xs2'],
                    datePickerArrowIconStyle,
                  ]"
                />
              </button>
            </WizVStack>
          </WizHStack>
          <WizText as="span" fontSize="xs" color="gray.700">
            {{ currentDateTitle }}
          </WizText>
          <div :class="datePickerMonthSelectorStyle">
            <button
              :aria-label="ARIA_LABELS.MONTH_SELECTOR_PREV"
              :class="datePickerMonthSelectorItemStyle"
              @click="clickToPreviousMonth"
            >
              <WizIcon size="md" color="inherit" :icon="WizIChevronLeft" />
            </button>
            <button
              :aria-label="ARIA_LABELS.MONTH_SELECTOR_NEXT"
              :class="datePickerMonthSelectorItemStyle"
              @click="clickToNextMonth"
            >
              <WizIcon size="md" color="inherit" :icon="WizIChevronRight" />
            </button>
          </div>
        </WizHStack>
        <WizCalendar
          :activeDates="
            calendarValue
              ? [
                  {
                    date: calendarValue,
                    state: 'primary',
                  },
                ]
              : []
          "
          @click="(date) => (calendarValue = date)"
          :currentMonth="currentMonth"
          filledWeeks
        />
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import {
  datePickerStyle,
  datePickerVariantStyle,
  datePickerSelectorStyle,
  datePickerMonthSelectorStyle,
  datePickerMonthSelectorItemStyle,
  datePickerYearSelectorItemStyle,
  datePickerArrowIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import {
  inputBorderStyle,
  fillStyle,
  fontSizeStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import {
  WizIcon,
  WizVStack,
  WizHStack,
  WizCalendar,
  WizText,
  WizPopup,
  WizPopupContainer,
} from "@/components";
import {
  WizICalendar,
  WizIChevronLeft,
  WizIChevronRight,
  WizIArrowDropUp,
  WizIArrowDropDown,
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

interface Emit {
  (e: "update:modelValue", value: Date): void;
  (e: "update:isOpen", value: boolean): void;
}

const props = defineProps({
  modelValue: {
    type: [Date, null] as PropType<Date | null>,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "日付を選択",
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
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

const defaultCurrentMonth = props.modelValue || new Date();
const currentMonth = ref(defaultCurrentMonth);

const setIsOpen = (value: boolean) => {
  emit("update:isOpen", value);
};

const clickToNextMonth = () => {
  const setDateTime = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToPreviousMonth = () => {
  const setDateTime = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToNextYear = () => {
  const setDateTime = new Date(
    currentMonth.value.getFullYear() + 1,
    currentMonth.value.getMonth(),
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToPreviousYear = () => {
  const setDateTime = new Date(
    currentMonth.value.getFullYear() - 1,
    currentMonth.value.getMonth(),
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const parseValue = (inputValue: Date | null) => {
  if (inputValue === null) return undefined;
  const value = new Date(inputValue);
  return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
};

const currentDateTitle = computed(() => {
  return `${currentMonth.value.getMonth() + 1}月`;
});
const calendarValue = computed({
  get: () => props.modelValue,
  set: (value) => value && emit("update:modelValue", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const borderState = computed(() => {
  if (isError.value) return "error";
  if (props.isOpen) return "active";
  return "default";
});

const variant = computed(() => {
  if (props.disabled) return "disabled";
  if (calendarValue.value) return "selected";
  return "default";
});
</script>
