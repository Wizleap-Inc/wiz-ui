<template>
  <div
    :class="{
      'wiz-message-box': true,
      'wiz-message-box--information': variant === 'information',
      'wiz-message-box--caution': variant === 'caution',
      'wiz-message-box--warning': variant === 'warning',
      'wiz-message-box--expand': expand,
    }"
  >
    <component v-if="icon" :is="icon" class="wiz-message-box__icon" />
    <div>
      <div class="wiz-message-box__title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue, { computed } from "vue";

import { THEME } from "@/constants/styles";
import { getColorCss } from "@/utils/styles/color";

interface Props {
  variant: "information" | "caution" | "warning";
  title: string;
  icon?: Vue;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "information",
  title: "",
  expand: false,
});

const computedColor = computed(() => {
  if (props.variant === "caution") return getColorCss("yellow.800");
  if (props.variant === "warning") return getColorCss("red.800");
  return getColorCss("green.800");
});

const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];
const colorYellow300 = THEME.color.yellow["300"];
const colorYellow800 = THEME.color.yellow["800"];
const colorRed300 = THEME.color.red["300"];
const colorRed800 = THEME.color.red["800"];
const colorGray700 = THEME.color.gray["700"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingSm = THEME.spacing.sm;
const spacingMd = THEME.spacing.md;
const fontSizeSm = THEME.fontSize.sm;
const fontSizeXl2 = THEME.fontSize.xl2;
</script>

<style lang="scss" scoped>
.wiz-message-box {
  display: flex;
  width: max-content;
  height: max-content;
  padding: v-bind(spacingMd);

  &--information {
    background: v-bind(colorGreen300);
    border: 1px solid v-bind(colorGreen800);
    border-radius: v-bind(spacingXs2);
  }

  &--caution {
    background: v-bind(colorYellow300);
    border: 1px solid v-bind(colorYellow800);
    border-radius: v-bind(spacingXs2);
  }

  &--warning {
    background: v-bind(colorRed300);
    border: 1px solid v-bind(colorRed800);
    border-radius: v-bind(spacingXs2);
  }

  &--expand {
    width: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: v-bind(fontSizeSm);
    line-height: v-bind(fontSizeXl2);
    margin-bottom: v-bind(spacingXs);
    color: v-bind(colorGray700);
  }

  &__icon {
    font-size: v-bind(fontSizeXl2);
    margin-right: v-bind(spacingSm);
    fill: v-bind(computedColor);
  }
}
</style>
