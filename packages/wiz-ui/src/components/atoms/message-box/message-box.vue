<template>
  <div
    :class="{
      'wiz-message-box': true,
      'wiz-message-box--information': type === 'information',
      'wiz-message-box--caution': type === 'caution',
      'wiz-message-box--warning': type === 'warning',
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
  type: "information" | "caution" | "warning";
  title: string;
  icon?: Vue;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "information",
  title: "",
  expand: false,
});

const computedColor = computed(() => {
  if (props.type === "caution") return getColorCss("yellow.800");
  if (props.type === "warning") return getColorCss("red.800");
  return getColorCss("green.800");
});

const colorGreen = THEME.color.green["300"];
const borderGreen = THEME.color.green["800"];
const colorYellow = THEME.color.yellow["300"];
const borderYellow = THEME.color.yellow["800"];
const colorRed = THEME.color.red["300"];
const borderRed = THEME.color.red["800"];
const colorGray = THEME.color.gray["700"];
const borderRadiusXxs = THEME.spacing.xs2;
const paddingMd = THEME.spacing.md;
const fontSizeSm = THEME.fontSize.sm;
const fontSizeXl = THEME.fontSize.xl;
const marginXs = THEME.spacing.xs;
const marginSm = THEME.spacing.sm;
</script>

<style lang="scss" scoped>
.wiz-message-box {
  display: flex;
  width: max-content;
  height: max-content;
  padding: v-bind(paddingMd);

  &--information {
    background: v-bind(colorGreen);
    border: 1px solid v-bind(borderGreen);
    border-radius: v-bind(borderRadiusXxs);
  }

  &--caution {
    background: v-bind(colorYellow);
    border: 1px solid v-bind(borderYellow);
    border-radius: v-bind(borderRadiusXxs);
  }

  &--warning {
    background: v-bind(colorRed);
    border: 1px solid v-bind(borderRed);
    border-radius: v-bind(borderRadiusXxs);
  }

  &--expand {
    width: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: v-bind(fontSizeSm);
    margin-bottom: v-bind(marginXs);
    color: v-bind(colorGray);
  }

  &__icon {
    font-size: v-bind(fontSizeXl);
    margin-right: v-bind(marginSm);
    fill: v-bind(computedColor);
  }
}
</style>
