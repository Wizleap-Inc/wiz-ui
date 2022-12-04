<template>
  <div
    class="wiz-timepicker"
    :class="{
      'wiz-timepicker--active': opentimepicker,
      'wiz-timepicker--disabled': disabled,
    }"
  >
    <div
      class="wiz-timepicker__box"
      :class="{ 'wiz-timepicker__box--selected': !!value }"
      @click="toggletimepicker"
    >
      <WizHStack gap="sm" align="center" height="100%">
        <WizSchedule class="wiz-timepicker__box-icon" />
        <span v-if="!value">{{ placeholder }}</span>
        <span
          v-for="(option, key) in options"
          v-show="option.value === value"
          :key="'selected' + key"
        >
          {{ option.label }}
        </span>
      </WizHStack>
    </div>
    <div class="wiz-timepicker__selector" v-show="opentimepicker">
      <WizVStack gap="xs2">
        <div
          class="wiz-timepicker__selector-option"
          v-for="(option, key) in options"
          :key="'option' + key"
          @click="onSelect(option.value)"
        >
          {{ option.label }}
        </div>
      </WizVStack>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { WizSchedule } from "@/components/icons";
import { THEME } from "@/constants/styles";

import { WizHStack } from "../../stack";
import { WizVStack } from "../../stack";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value: string;
  placeholder: string;
  width?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  placeholder: "時間を選択",
  width: "8rem",
  disabled: false,
});

const opentimepicker = ref(false);
const toggletimepicker = () => {
  if (props.disabled) {
    return;
  }
  opentimepicker.value = !opentimepicker.value;
};

interface Emit {
  (e: "input", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: string) => {
  toggletimepicker();
  emit("input", value);
};

const width = computed(() => props.width);
const fontSizeSm = THEME.fontSize.sm;
const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingXl3 = THEME.spacing.xl3;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];

const fontSizeMd = THEME.fontSize.md;
const shadowSm = THEME.shadow.sm;
const zIndexPopup = THEME.zIndex.popup;
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-timepicker {
  position: relative;
  width: max-content;
  padding-left: 0.25em;
  padding-right: 0.25em;
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

    &-icon {
      fill: v-bind(colorGray500);
      font-size: v-bind(fontSizeMd);
    }

    &--selected {
      color: v-bind(colorGray700);
    }
  }

  &__selector {
    position: absolute;
    top: calc(100% + $border-width * 2);
    left: 0;
    width: 100%;
    padding: v-bind(spacingXs);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
    box-shadow: v-bind(shadowSm);
    z-index: v-bind(zIndexPopup);
  }

  &__selector-option {
    position: relative;
    width: 100%;
    padding: v-bind(spacingXs) v-bind(spacingXs2);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray700);
    box-sizing: border-box;

    &:hover {
      color: v-bind(colorGreen800);
      background: v-bind(colorGreen300);
    }

    &:active {
      color: v-bind(colorWhite800);
      background: v-bind(colorGreen800);
    }
  }
}
</style>
