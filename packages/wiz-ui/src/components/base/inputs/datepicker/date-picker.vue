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
          <WizHStack align="center" my="xs2" px="xs" justify="between">
            <WizText fontSize="xs" color="gray.700">{{
              currentDateTitle
            }}</WizText>
            <div class="wiz-datepicker__button_box">
              <div class="wiz-datepicker__button_box_item">
                <WizIcon size="md" :icon="WizIChevronLeft" />
              </div>
              <div class="wiz-datepicker__button_box_item">
                <WizIcon size="md" :icon="WizIChevronRight" />
              </div>
            </div>
          </WizHStack>
          <WizCalendar v-model="value" filledWeeks />
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
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
import { THEME } from "@/constants/";

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

const currentDateTitle = computed(() => {
  return `${props.value.getFullYear()}年${props.value.getMonth() + 1}月`;
});

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
const colorGreen300 = THEME.color.green["300"];
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

  &__button_box {
    gap: v-bind(spacingXs2);
    display: flex;
    &_item {
      cursor: pointer;
      padding: v-bind(spacingXs2);
      border-radius: v-bind(spacingXs2);
      &:hover {
        background-color: v-bind(colorGreen300);
        color: v-bind(colorGreen800);
      }
      &:active {
        background-color: v-bind(colorGreen800);
        color: v-bind(colorWhite800);
      }
    }
  }
}
</style>
