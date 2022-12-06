<template>
  <WizPopupContainer v-model="openDatepicker">
    <div
      class="wiz-datepicker"
      :class="{
        'wiz-datepicker--active': openDatepicker,
        'wiz-datepicker--disabled': disabled,
      }"
    >
      <div
        class="wiz-datepicker__box"
        :class="{ 'wiz-datepicker__box--selected': !!value }"
        @click="toggleDatepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizIcon size="xl2" color="gray.500" :icon="WizICalendar" />
          <span>{{ parseValue(value) || placeholder }}</span>
        </WizHStack>
      </div>
      <WizPopup layer="popover" gap="xs">
        <div class="wiz-datepicker__selector">
          <WizCalendar v-model="value" filledWeeks />
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { WizIcon, WizHStack, WizCalendar } from "@/components";
import { WizICalendar } from "@/components/icons";
import { THEME } from "@/constants/styles";

import { WizPopup, WizPopupContainer } from "../../popup";

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

const openDatepicker = ref(false);

const toggleDatepicker = () => {
  if (props.disabled) {
    return;
  }
  openDatepicker.value = !openDatepicker.value;
};

const parseValue = (value: Date) => {
  return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
};

const width = computed(() => props.width);
const fontSizeSm = THEME.fontSize.sm;
const spacingNo = THEME.spacing.no;
const spacingXs = THEME.spacing.xs;
const spacingXs2 = THEME.spacing.xs2;
const spacingXl3 = THEME.spacing.xl3;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen800 = THEME.color.green["800"];
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-datepicker {
  width: max-content;
  padding: 0 v-bind(spacingXs2);
  height: v-bind(spacingXl3);
  background: v-bind(colorWhite800);
  border: $border-width solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;
  cursor: pointer;

  &--active {
    border-color: v-bind(colorGreen800);
  }

  &--disabled {
    color: v-bind(colorGray700);
    background-color: v-bind(colorGray300);
    cursor: not-allowed;
  }

  &__box {
    height: 100%;
    padding: v-bind(spacingNo) v-bind(spacingXs);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray500);
    width: v-bind(width);

    &--selected {
      color: v-bind(colorGray700);
    }
  }

  &__selector {
    position: absolute;
    top: calc(100% + $border-width * 2);
    left: 0;
    width: auto;
    padding: v-bind(spacingXs);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
  }
}
</style>
