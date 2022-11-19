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
        v-if="title || (!title && slots.mainHeaderArea) || hint"
        class="wiz-card__header"
      >
        <WizHStack gap="xs2" class="wiz-card__header-main">
          <slot v-if="!title" name="mainHeaderArea"></slot>
          <div class="wiz-card__header-title">{{ title }}</div>
          <component v-if="hint" :is="WizIHint" />
        </WizHStack>
        <slot name="subHeaderArea"></slot>
      </div>
      <slot></slot>
      <div class="wiz-card__footer" v-if="slots.footer">
        <slot name="footer"></slot>
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

import WizHStack from "@/components/atoms/stack/h-stack.vue";
import WizVStack from "@/components/atoms/stack/v-stack.vue";
import WizIHint from "@/components/icons/hint.vue";
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
  align?: "start" | "center" | "end";
  fit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  p: "md",
  backgroundColor: "white.800",
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

const computedAlign = computed(() => props.align);
const colorGray400 = THEME.color.gray["400"];
const colorGray700 = THEME.color.gray["700"];
const fontSizeMd = THEME.fontSize.md;
const spacingXs2 = THEME.spacing.xs2;
const shadowMd = THEME.shadow.md;
</script>

<style lang="scss" scoped>
.wiz-card {
  width: 100%;
  background-color: v-bind(computedBackgroundColor);
  padding: v-bind(computedPadding);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;

  &--shadow {
    box-shadow: v-bind(shadowMd);
  }

  &--border {
    border: 1px solid v-bind(colorGray400);
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
