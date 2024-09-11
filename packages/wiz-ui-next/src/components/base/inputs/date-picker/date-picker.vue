<template>
  <WizPopupContainer :width="width">
    <button
      type="button"
      :class="[
        datePickerStyle,
        datePickerVariantStyle[variant],
        inputBorderStyle[borderState],
      ]"
      :aria-label="ARIA_LABELS.DATE_PICKER_INPUT"
      @click="setIsOpen(!isOpen)"
      @keydown.up="clickToNextYear"
      @keydown.down="clickToPreviousYear"
      @keydown.left="clickToPreviousMonth"
      @keydown.right="clickToNextMonth"
    >
      <WizHStack align="center" height="100%" justify="between" nowrap>
        <WizHStack gap="xs" align="center" height="100%" nowrap>
          <span>
            <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
          </span>
          <span :style="{ whiteSpace: 'nowrap' }">{{
            (calendarValue && formatDate(calendarValue)) || placeholder
          }}</span>
        </WizHStack>
        <button
          v-if="!disabled && !!calendarValue"
          type="button"
          :class="datePickerCancelIconStyle"
          :aria-label="ARIA_LABELS.DATE_PICKER_CANCEL"
          @click="onClickCancel"
        >
          <WizIcon size="xl2" color="inherit" :icon="WizICancel" />
        </button>
      </WizHStack>
    </button>
    <WizPopup
      :isOpen="!disabled && isOpen"
      @onClose="onClose"
      :isDirectionFixed="isDirectionFixed"
    >
      <div :class="datePickerSelectorStyle">
        <WizHStack align="center" my="xs2" justify="between">
          <WizHStack align="center" pl="xs" gap="xs">
            <WizHStack align="center" gap="xs2">
              <WizText
                as="span"
                fontSize="xs"
                line-height="lg"
                color="gray.800"
              >
                {{ formatYear(currentMonth.getFullYear()) }}
              </WizText>
              <WizVStack>
                <button
                  type="button"
                  :aria-label="ARIA_LABELS.YEAR_SELECTOR_NEXT"
                  :class="[datePickerYearSelectorItemStyle]"
                  @click="clickToNextYear"
                >
                  <WizIArrowDropUp
                    :class="[
                      fillStyle['gray.800'],
                      fontSizeStyle['xs2'],
                      datePickerArrowIconStyle,
                    ]"
                  />
                </button>
                <button
                  type="button"
                  :aria-label="ARIA_LABELS.YEAR_SELECTOR_PREV"
                  :class="[datePickerYearSelectorItemStyle]"
                  @click="clickToPreviousYear"
                >
                  <WizIArrowDropDown
                    :class="[
                      fillStyle['gray.800'],
                      fontSizeStyle['xs2'],
                      datePickerArrowIconStyle,
                    ]"
                  />
                </button>
              </WizVStack>
            </WizHStack>
            <WizText as="span" fontSize="xs" color="gray.800">
              {{ currentDateTitle }}
            </WizText>
          </WizHStack>
          <div :class="datePickerMonthSelectorStyle">
            <button
              type="button"
              :aria-label="ARIA_LABELS.MONTH_SELECTOR_PREV"
              :class="datePickerMonthSelectorItemStyle"
              @click="clickToPreviousMonth"
            >
              <WizIcon size="md" color="inherit" :icon="WizIChevronLeft" />
            </button>
            <button
              type="button"
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
            tempDate
              ? [
                  {
                    date: tempDate,
                    state: 'primary',
                  },
                ]
              : []
          "
          @click="handleClickCalendar"
          :currentMonth="currentMonth"
          filledWeeks
          :disabledDate="disabledDate"
          :_today="_today || new Date()"
        />
        <WizDivider color="gray.300" />
        <WizHStack p="sm" gap="sm" justify="end">
          <WizTextButton @click="onClose" variant="sub">
            {{ ARIA_LABELS.CANCEL }}
          </WizTextButton>
          <WizTextButton @click="onSubmit">
            {{ ARIA_LABELS.APPLY }}
          </WizTextButton>
        </WizHStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import {
  datePickerArrowIconStyle,
  datePickerCancelIconStyle,
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
import { PropType, computed, inject, ref } from "vue";

import {
  WizCalendar,
  WizDivider,
  WizHStack,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizText,
  WizTextButton,
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
  (e: "update:modelValue", value: Date | null): void;
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
    default: "12rem",
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
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * @description 日付が無効かどうかを判定する関数です。無効な日付はクリック不可になります。
   * @param date
   * @returns {boolean} `true`: 無効な日付, `false`: 有効な日付
   */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
    default: () => false,
  },
  /**
   * @description 年の表示形式をカスタマイズします。
   * @default (year) => `${year}年`
   */
  formatYear: {
    type: Function as PropType<(year: number) => string>,
    required: false,
    default: (year: number) => `${year}`,
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

const defaultCurrentMonth = props.modelValue || new Date();
const currentMonth = ref(defaultCurrentMonth);

const setIsOpen = (value: boolean) => emit("update:isOpen", value);
const onClickCancel = () => emit("update:modelValue", null);

const tempDate = ref(props.modelValue);

const clickToNextMonth = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
  const setDateTime = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToPreviousMonth = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
  const setDateTime = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToNextYear = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
  const setDateTime = new Date(
    currentMonth.value.getFullYear() + 1,
    currentMonth.value.getMonth(),
    1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToPreviousYear = (e: KeyboardEvent | MouseEvent) => {
  e.preventDefault();
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
  get: () => props.modelValue,
  set: (value) => value && emit("update:modelValue", value),
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
  if (tempDate.value) return "selected";
  return "default";
});

const handleClickCalendar = (date: Date) => (tempDate.value = date);

const onClose = () => {
  tempDate.value = calendarValue.value;
  setIsOpen(false);
};

const onSubmit = () => {
  calendarValue.value = tempDate.value;
  setIsOpen(false);
};
</script>
