<template>
  <button
    :class="{
      'wiz-text-button': true,
      'wiz-text-button--variant-primary': variant === 'primary',
      'wiz-text-button--variant-sub': variant === 'sub',
      'wiz-text-button--disabled': disabled,
      'wiz-text-button--round': rounded,
      'wiz-text-button--expand': expand,
      'wiz-text-button--size-sm': size === 'sm',
      'wiz-text-button--size-md': size === 'md',
      'wiz-text-button--size-lg': size === 'lg',
    }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

import { ComponentName } from "@/constants/component/name";
import { THEME } from "@/constants/styles";
import { SPACING_MAP } from "@/constants/styles/spacing";

defineOptions({
  name: ComponentName.TextButton,
});

interface Props {
  variant?: "primary" | "sub";
  size?: "sm" | "md" | "lg";
  expand?: boolean;
  disabled?: boolean;
  rounded?: boolean;
}

interface Emits {
  (e: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  rounded: false,
  expand: false,
  size: "md",
});

const emit = defineEmits<Emits>();

const onClick = () => {
  if (!props.disabled) emit("click");
};

const colorGradient = THEME.color.gradient;
const colorWhite = THEME.color.white["800"];
const colorGreen = THEME.color.green["800"];
const shadowMd = THEME.shadow.md;
const borderRadiusXxs = THEME.spacing.xs2;
const borderRadiusMax = THEME.spacing.max;
const gray400 = THEME.color.gray["400"];
const padding = `${SPACING_MAP["xs"]} ${SPACING_MAP["xl"]}`;
const fontSizeXs = THEME.fontSize["xs"];
const fontSizeSm = THEME.fontSize["sm"];
const fontSizeMd = THEME.fontSize["md"];
</script>

<style lang="scss" scoped>
.wiz-text-button {
  width: fit-content;
  font-weight: bold;
  padding: v-bind(padding);
  cursor: pointer;
  opacity: 1;
  border-radius: v-bind(borderRadiusXxs);
  border: none;

  &:hover:not(&--disabled) {
    opacity: 0.9;
  }

  &--variant {
    &-primary {
      background: v-bind(colorGradient);
      color: v-bind(colorWhite);
      box-shadow: v-bind(shadowMd);
    }
    &-sub {
      background: v-bind(colorWhite);
      color: v-bind(colorGreen);
      border: 1px solid v-bind(gray400);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--round {
    border-radius: v-bind(borderRadiusMax);
  }

  &--expand {
    width: 100%;
  }

  &--size {
    &-sm {
      font-size: v-bind(fontSizeXs);
    }
    &-md {
      font-size: v-bind(fontSizeSm);
    }
    &-lg {
      font-size: v-bind(fontSizeMd);
    }
  }
}
</style>
