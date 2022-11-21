<template>
  <div
    class="wiz-selectbox"
    :class="{
      'wiz-selectbox--active': openSelectBox,
      'wiz-selectbox--disabled': disabled,
    }"
  >
    <div
      class="wiz-selectbox__box"
      :class="{ 'wiz-selectbox__box--selected': value }"
      @click="toggleSelectBox"
    >
      <WizHStack gap="sm" align="center">
        <span v-if="!value">選択して下さい</span>
        <span
          v-for="(option, key) in options"
          v-show="option.id === value"
          :key="'selected' + key"
        >
          {{ option.name }}
        </span>
        <WizIExpandLess v-if="openSelectBox" class="wiz-selectbox__box-less" />
        <WizIExpandMore
          v-else-if="!openSelectBox"
          class="wiz-selectbox__box-more"
        />
      </WizHStack>
    </div>
    <div class="wiz-selectbox__selector" v-show="openSelectBox">
      <WizVStack gap="xs2">
        <div
          class="wiz-selectbox__selector-option"
          v-for="(option, key) in options"
          :key="'option' + key"
          @click="
            toggleSelectBox();
            onSelect(option.id);
          "
        >
          {{ option.name }}
        </div>
      </WizVStack>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { WizIExpandMore } from "@/components/icons";
import { WizIExpandLess } from "@/components/icons";
import { THEME } from "@/constants/styles";

import { WizHStack } from "../../stack";
import { WizVStack } from "../../stack";

interface Option {
  id: string;
  name: string;
}

interface Props {
  options: Option[];
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
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
  (e: "select", value: string): void;
}
const emit = defineEmits<Emit>();
const onSelect = (optionId: string) => {
  emit("select", optionId);
};

const fontSizeSm = THEME.fontSize.sm;
const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingSm = THEME.spacing.sm;
const spacingXl = THEME.spacing.xl;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen800 = THEME.color.green["800"];
const shadowSm = THEME.shadow.sm;
</script>

<style lang="scss" scoped>
.wiz-selectbox {
  position: relative;
  width: max-content;
  height: 40px;
  background: v-bind(colorWhite800);
  border: 1px solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;
  cursor: pointer;

  &--active {
    border-color: v-bind(colorGreen800);
  }

  &--disabled {
    background-color: v-bind(colorGray300);
  }

  &__box {
    line-height: 38px;
    padding: v-bind(spacingNo) v-bind(spacingXs);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray500);

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
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    padding: v-bind(spacingXs) v-bind(spacingNo);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
    box-shadow: v-bind(shadowSm);
    z-index: 10;
  }

  &__selector-option {
    position: relative;
    width: 100%;
    line-height: 36px;
    padding: v-bind(spacingNo) v-bind(spacingSm);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray700);
    box-sizing: border-box;

    &:hover {
      background: v-bind(colorGray300);
    }
  }
}
</style>
