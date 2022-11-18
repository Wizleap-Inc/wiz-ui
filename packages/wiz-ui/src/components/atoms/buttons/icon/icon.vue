<template>
  <button
    :class="{
      'wiz-icon-button': true,
      'wiz-icon-button--variant-primary': variant === 'primary',
      'wiz-icon-button--variant-sub': variant === 'sub',
      'wiz-icon-button--variant-transparent': variant === 'transparent',
      'wiz-icon-button--disabled': disabled,
      'wiz-icon-button--size-sm': size === 'sm',
      'wiz-icon-button--size-md': size === 'md',
      'wiz-icon-button--size-lg': size === 'lg',
    }"
    @click="onClick"
  >
    <component :is="icon" />
  </button>
</template>

<script setup lang="ts">
import Vue from "vue";

import { THEME } from "@/constants";

interface Props {
  icon: Vue;
  variant?: "primary" | "sub" | "transparent";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

interface Emits {
  (event: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
});

const emits = defineEmits<Emits>();

const onClick = () => props.disabled || emits("click");

const colorGradient = THEME.color.gradient;
const colorWhite800 = THEME.color.white["800"];
const colorGreen800 = THEME.color.green["800"];
const colorGray500 = THEME.color.gray["500"];
const colorGray400 = THEME.color.gray["400"];
const colorGray300 = THEME.color.gray["300"];
const shadowMd = THEME.shadow.md;
const spacingXs = THEME.spacing.xs;
const fontSizeXl = THEME.fontSize.xl;
const fontSizeXl2 = THEME.fontSize.xl2;
const fontSizeXl3 = THEME.fontSize.xl3;
</script>

<style lang="scss" scoped>
.wiz-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  padding: v-bind(spacingXs);

  &--variant {
    &-primary {
      box-shadow: v-bind(shadowMd);
      background: v-bind(colorGradient);
      border: none;
      & > svg {
        fill: v-bind(colorWhite800);
      }
      &:hover:not(.wiz-icon-button--disabled) {
        opacity: 0.9;
      }
    }

    &-sub {
      background: v-bind(colorWhite800);
      border: 1px solid v-bind(colorGray400);
      & > svg {
        fill: v-bind(colorGreen800);
      }
      &:hover:not(.wiz-icon-button--disabled) {
        background: v-bind(colorGray300);
      }
    }

    &-transparent {
      background: none;
      border: none;
      & > svg {
        fill: v-bind(colorGray500);
      }
      &:hover:not(.wiz-icon-button--disabled) {
        background: v-bind(colorGray300);
      }
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--size-sm {
    font-size: v-bind(fontSizeXl);
  }

  &--size-md {
    font-size: v-bind(fontSizeXl2);
  }

  &--size-lg {
    font-size: v-bind(fontSizeXl3);
  }
}
</style>
