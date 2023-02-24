<template>
  <WizPopupContainer>
    <div
      :class="[
        datePickerStyle,
        inputBorderStyle[state],
        disabled && datePickerDisabledStyle,
      ]"
    >
      <div
        :class="[
          datePickerBoxStyle,
          datePickerBoxColorStyle[datePickerBoxColor],
        ]"
        :style="{
          width,
        }"
        @click="toggleDatepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
          <span>{{ parseValue(calendarValue) || placeholder }}</span>
        </WizHStack>
      </div>
      <WizPopup
        :isOpen="openDatepicker"
        @onClose="openDatepicker = false"
        layer="popover"
        gap="xs"
      >
        <div :class="datePickerSelectorStyle">
          <WizHStack align="center" my="xs2" px="xs" justify="between">
            <WizText as="span" fontSize="xs" color="gray.700">{{
              currentDateTitle
            }}</WizText>
            <div :class="datePickerButtonBoxStyle">
              <div
                :class="datePickerButtonBoxItemStyle"
                @click="clickToPreviousMonth"
              >
                <WizIcon size="md" :icon="WizIChevronLeft" />
              </div>
              <div
                :class="datePickerButtonBoxItemStyle"
                @click="clickToNextMonth"
              >
                <WizIcon size="md" :icon="WizIChevronRight" />
              </div>
            </div>
          </WizHStack>
          <WizCalendar
            v-model="calendarValue"
            :currentMonth="currentMonth"
            filledWeeks
          />
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import {
  datePickerStyle,
  datePickerDisabledStyle,
  datePickerBoxStyle,
  datePickerBoxColorStyle,
  datePickerSelectorStyle,
  datePickerButtonBoxStyle,
  datePickerButtonBoxItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject } from "vue";

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
  (e: "update:modelValue", value: Date): void;
}

const props = defineProps({
  modelValue: {
    type: Date,
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
  const setDateTime = currentMonth.value.setMonth(
    currentMonth.value.getMonth() + 1
  );
  currentMonth.value = new Date(setDateTime);
};

const clickToPreviousMonth = () => {
  const setDateTime = currentMonth.value.setMonth(
    currentMonth.value.getMonth() - 1
  );
  currentMonth.value = new Date(setDateTime);
};

const parseValue = (inputValue?: Date) => {
  const value = inputValue ?? new Date();
  return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
};

const currentDateTitle = computed(() => {
  return `${currentMonth.value.getFullYear()}年${
    currentMonth.value.getMonth() + 1
  }月`;
});

const calendarValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const datePickerBoxColor = computed(() =>
  calendarValue.value ? "selected" : "default"
);

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const state = computed(() => {
  if (isError.value) return "error";
  if (openDatepicker.value) return "active";
  return "default";
});
</script>
