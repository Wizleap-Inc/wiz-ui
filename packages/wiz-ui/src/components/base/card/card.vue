<template>
  <div
    :class="{
      'wiz-card': true,
      'wiz-card--shadow': shadow,
      'wiz-card--border': border,
      'wiz-card--fit': fit,
    }"
  >
    <WizVStack gap="md">
      <div
        v-if="title || (!title && slots.subHeaderArea) || hint"
        class="wiz-card__header"
      >
        <WizHStack gap="xs2" class="wiz-card__header-main">
          <slot v-if="!title" name="mainHeaderArea"></slot>
          <div class="wiz-card__header-title">{{ title }}</div>
          <component v-if="hint" :is="WizIHint" />
        </WizHStack>
        <slot name="subHeaderArea"></slot>
      </div>
      <slot v-if="slots.default" />
      <div class="wiz-card__footer" v-if="slots.footer">
        <slot name="footer"></slot>
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

import { WizHStack, WizVStack, WizIHint } from "@/components";
import { THEME } from "@/constants/styles";
import { ColorKeys } from "@/types/styles/color";
import { SpacingKeys } from "@/types/styles/spacing";
import { getColorCss } from "@/utils/styles/color";
import { getSpacingCSS, getCoupleSpacingCSS } from "@/utils/styles/spacing";

interface Props {
  title?: string;
  hint?: string;
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  backgroundColor?: ColorKeys;
  shadow?: boolean;
  border?: boolean;
  borderColor?: ColorKeys;
  align?: "start" | "center" | "end";
  fit?: boolean;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  p: "md",
  backgroundColor: "white.800",
  borderColor: "gray.400",
  shadow: false,
  border: false,
  align: "end",
});

const slots = useSlots();

const computedPadding = computed(() => {
  if (props.px && props.py) {
    return getCoupleSpacingCSS(props.px, props.py);
  }
  return getSpacingCSS(props.p);
});

const computedBackgroundColor = computed(() =>
  getColorCss(props.backgroundColor)
);

const computedBorderColor = computed(() => getColorCss(props.borderColor));

const computedAlign = computed(() => props.align);
const colorGray700 = THEME.color.gray["700"];
const fontSizeMd = THEME.fontSize.md;
const spacingXs2 = THEME.spacing.xs2;
const shadowMd = THEME.shadow.md;
const maxWidth = computed(() => props.maxWidth);
</script>

<style lang="scss" scoped>
.wiz-card {
  width: 100%;
  max-width: v-bind(maxWidth);
  background-color: v-bind(computedBackgroundColor);
  padding: v-bind(computedPadding);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;

  &--shadow {
    box-shadow: v-bind(shadowMd);
  }

  &--border {
    border: 1px solid v-bind(computedBorderColor);
  }

  &--fit {
    width: fit-content;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__header-main {
    display: flex;
    align-items: center;
  }

  &__header-title {
    font-size: v-bind(fontSizeMd);
    font-weight: 700;
    color: v-bind(colorGray700);
  }

  &__footer {
    text-align: v-bind(computedAlign);
  }
}
</style>
