<template>
  <WizPopupContainer v-model="openSelectBox" :expand="expand">
    <div
      class="wiz-selectbox"
      :class="{
        'wiz-selectbox--active': openSelectBox,
        'wiz-selectbox--disabled': disabled,
      }"
    >
      <div
        class="wiz-selectbox__box"
        :class="{ 'wiz-selectbox__box--selected': !!value }"
        @click="toggleSelectBox"
      >
        <WizHStack align="center" justify="between" height="100%">
          <span v-if="!value">{{ placeholder }}</span>
          <span
            v-for="(option, key) in options"
            v-show="option.value === value"
            :key="'selected' + key"
            class="wiz-selectbox__box__selected-value"
          >
            {{ option.label }}
          </span>
          <WizIExpandLess
            v-if="openSelectBox"
            class="wiz-selectbox__box-less"
          />
          <WizIExpandMore
            v-else-if="!openSelectBox"
            class="wiz-selectbox__box-more"
          />
        </WizHStack>
      </div>
    </div>
    <WizPopup layer="popover">
      <div class="wiz-selectbox__selector">
        <WizVStack gap="xs2">
          <div
            class="wiz-selectbox__selector-option"
            v-for="(option, key) in options"
            :key="'option' + key"
            @click="onSelect(option.value)"
          >
            {{ option.label }}
          </div>
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";
import { THEME } from "@wiz-ui/constants/styles";
import { ref, computed } from "vue";

import { WizPopupContainer, WizPopup } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";

import { WizHStack } from "../../stack";
import { WizVStack } from "../../stack";

import { Option } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

interface Props {
  options: Option[];
  value: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  placeholder: "選択してください",
  width: "10rem",
  disabled: false,
});

const openSelectBox = ref(false);
const toggleSelectBox = () => {
  if (props.disabled) {
    return;
  }
  openSelectBox.value = !openSelectBox.value;
};

interface Emit {
  (e: "input", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: string) => {
  toggleSelectBox();
  emit("input", value);
};

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
const fontSizeSm = THEME.fontSize.sm;
const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingXl = THEME.spacing.xl;
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

.wiz-selectbox {
  position: relative;
  width: v-bind(computedWidth);
  height: v-bind(spacingXl3);
  background: v-bind(colorWhite800);
  border: $border-width solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
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
    width: 100%;
    box-sizing: border-box;

    &__selected-value {
      overflow: hidden;
    }

    &-less {
      fill: v-bind(colorGreen800);
      font-size: v-bind(spacingXl);
    }

    &-more {
      fill: v-bind(colorGray500);
      font-size: v-bind(spacingXl);
    }

    &--selected {
      color: v-bind(colorGray700);
    }
  }

  &__selector {
    min-width: calc(v-bind(width) + $border-width * 2);
    padding: v-bind(spacingXs);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
    max-height: 25rem;
    overflow-y: auto;
  }

  &__selector-option {
    width: 100%;
    padding: v-bind(spacingXs) v-bind(spacingXs2);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray700);
    box-sizing: border-box;
    cursor: pointer;

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
