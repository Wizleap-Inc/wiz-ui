<template>
  <WizPopupContainer v-model="openDatepicker">
    <div
      :class="[
        datePickerStyle,
        openDatepicker && datePickerActiveStyle,
        disabled && datePickerDisabledStyle,
      ]"
    >
      <div
        :class="datePickerBoxStyle"
        :style="{
          width,
          color: datePickerBoxColor,
        }"
        @click="toggleDatepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
          <span>{{ parseValue(value) || placeholder }}</span>
        </WizHStack>
      </div>
      <WizPopup layer="popover" gap="xs">
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
            v-model="value"
            :currentMonth="currentMonth"
            filledWeeks
          />
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  datePickerStyle,
  datePickerActiveStyle,
  datePickerDisabledStyle,
  datePickerBoxStyle,
  datePickerSelectorStyle,
  datePickerButtonBoxStyle,
  datePickerButtonBoxItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import { ref, computed } from "vue";

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

interface Props {
  value: Date;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "日付を選択",
  width: "10rem",
  disabled: false,
});

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

const datePickerBoxColor = computed(() =>
  props.value ? THEME.color.gray["700"] : THEME.color.gray["500"]
);
</script>
