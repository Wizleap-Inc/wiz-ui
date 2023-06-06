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
      :disabled="disabled"
      @click="setIsOpen(!isOpen)"
    >
      <WizHStack gap="xs" align="center" height="100%">
        <span
          v-if="valueIsEmpty"
          @mouseenter="setIsHover(true)"
          @mouseleave="setIsHover(false)"
        >
          <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
        </span>
        <button
          v-else
          :class="datePickerCancelButtonStyle"
          @click="onClickCancel"
          @mouseenter="setIsHover(true)"
          @mouseleave="setIsHover(false)"
        >
          <WizIcon
            size="xl2"
            :color="isHover ? 'green.800' : 'gray.500'"
            :icon="WizICancel"
          />
        </button>
        <span>{{
          (calendarValue && formatDateToYYMMDD(calendarValue)) || placeholder
        }}</span>
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
  datePickerArrowIconStyle,
  datePickerCancelButtonStyle,
  datePickerMonthSelectorItemStyle,
  datePickerMonthSelectorStyle,
  datePickerSelectorStyle,
  datePickerStyle,
  datePickerVariantStyle,
  datePickerYearSelectorItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import {
  fillStyle,
  fontSizeStyle,
  inputBorderStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { formatDateToYYMMDD } from "@wizleap-inc/wiz-ui-utils";
import { PropType, computed, inject, ref } from "vue";

import {
  WizCalendar,
  WizHStack,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizText,
  WizVStack,
} from "@/components";
import {
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizICalendar,
  WizICancel,
  WizIChevronLeft,
  WizIChevronRight,
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";
interface Emit {
  (e: "input", value: Date | null): void;
  (e: "updateIsOpen", value: boolean): void;
  (e: "updateIsHover", value: boolean): void;
}

const props = defineProps({
  value: {
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
  /**
   * `isHover=true`の時、キャンセルアイコンを緑色にします。
   */
  isHover: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<Emit>();

const defaultCurrentMonth = props.value || new Date();
const currentMonth = ref(defaultCurrentMonth);

const valueIsEmpty = computed(() => !props.value);
const setIsOpen = (value: boolean) => emit("updateIsOpen", value);
const setIsHover = (value: boolean) => emit("updateIsHover", value);
const onClickCancel = () => emit("input", null);

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

const currentDateTitle = computed(() => {
  return `${currentMonth.value.getMonth() + 1}月`;
});

const calendarValue = computed({
  get: () => props.value,
  set: (value) => value && emit("input", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const borderState = computed(() => {
  if (isError.value) return "error";
  if (props.isOpen && !props.disabled) return "active";
  return "default";
});

const variant = computed(() => {
  if (props.disabled) return "disabled";
  if (calendarValue.value) return "selected";
  return "default";
});
</script>
