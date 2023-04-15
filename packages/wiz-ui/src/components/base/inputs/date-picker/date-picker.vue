<template>
  <WizPopupContainer>
    <button
      :class="[
        styles.datePickerStyle,
        styles.datePickerVariantStyle[variant],
        commonStyles.inputBorderStyle[borderState],
      ]"
      :style="{
        width,
      }"
      :aria-label="ARIA_LABELS.DATE_PICKER_INPUT"
      @click="toggleDatepicker"
    >
      <WizHStack gap="xs" align="center" height="100%">
        <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
        <span>{{ parseValue(calendarValue) || placeholder }}</span>
      </WizHStack>
    </button>
    <WizPopup :isOpen="openDatepicker" @onClose="openDatepicker = false">
      <div :class="styles.datePickerSelectorStyle">
        <WizHStack align="center" my="xs2" px="xs" justify="between">
          <WizText as="span" fontSize="xs" color="gray.700">{{
            currentDateTitle
          }}</WizText>
          <div :class="styles.datePickerMonthSelectorStyle">
            <button
              :aria-label="ARIA_LABELS.MONTH_SELECTOR_PREV"
              :class="styles.datePickerMonthSelectorItemStyle"
              @click="clickToPreviousMonth"
            >
              <WizIcon size="md" color="inherit" :icon="WizIChevronLeft" />
            </button>
            <button
              :aria-label="ARIA_LABELS.MONTH_SELECTOR_NEXT"
              :class="styles.datePickerMonthSelectorItemStyle"
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import {
  WizIcon,
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
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

interface Emit {
  (e: "input", value: Date): void;
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
});

const emit = defineEmits<Emit>();

const defaultCurrentMonth = new Date().setHours(0, 0, 0, 0);
const currentMonth = ref(new Date(defaultCurrentMonth));
const openDatepicker = ref(false);

const toggleDatepicker = () => {
  if (props.disabled) {
    return;
  }
  openDatepicker.value = !openDatepicker.value;
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

const parseValue = (inputValue: Date | null) => {
  if (inputValue === null) return undefined;
  const value = inputValue ?? new Date();
  return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
};

const currentDateTitle = computed(() => {
  return `${currentMonth.value.getFullYear()}年${
    currentMonth.value.getMonth() + 1
  }月`;
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
  if (openDatepicker.value) return "active";
  return "default";
});

const variant = computed(() => {
  if (props.disabled) return "disabled";
  if (calendarValue.value) return "selected";
  return "default";
});
</script>
