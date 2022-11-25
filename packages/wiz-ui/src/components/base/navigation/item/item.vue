<template>
  <RouterLink
    :to="to"
    :class="{
      'wiz-navigation-item': true,
      'wiz-navigation-item--active': active,
    }"
  >
    <component :is="icon" class="wiz-navigation-item__icon" />
    <div class="wiz-navigation-item__text" v-if="isMenuOpen">
      {{ label }}
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import Vue, { inject, ref } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { THEME } from "@/constants";

import { key } from "../provider";

interface Props {
  icon: Vue;
  label: string;
  active: boolean;
  to: RouterLinkProps["to"];
}

const { isMenuOpen } = inject(key, {
  isMenuOpen: ref(true),
});

defineProps<Props>();

const transparent = THEME.color.transparent;
const gray700 = THEME.color.gray["700"];
const green800 = THEME.color.green["800"];
const white800 = THEME.color.white["800"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingSm = THEME.spacing.sm;
const spacingXl = THEME.spacing.xl;
const fontSizeXs = THEME.fontSize.xs;
const fontSizeXl2 = THEME.fontSize.xl2;
const itemPadding = `${spacingXs} ${spacingSm} ${spacingXs} ${spacingXl}`;
</script>

<style lang="scss" scoped>
.wiz-navigation-item {
  display: flex;
  align-items: center;
  gap: v-bind(spacingSm);
  padding: v-bind(itemPadding);
  border-radius: v-bind(spacingXs2);
  color: v-bind(gray700);
  text-decoration: none;
  position: relative;
  font-size: v-bind(fontSizeXs);
  line-height: v-bind(fontSizeXl2);
  transition: background-color 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(spacingXs2);
    height: 100%;
    background-color: v-bind(transparent);
    border-radius: v-bind(spacingXs2);
    transition: background-color 0.2s ease-in-out;
  }

  &:hover::before,
  &--active::before {
    background-color: v-bind(green800);
  }

  &--active {
    color: v-bind(green800);
    background-color: v-bind(white800);

    .wiz-navigation-item__icon {
      fill: v-bind(green800);
    }
  }

  &__icon {
    font-size: v-bind(fontSizeXl2);
    fill: v-bind(gray700);
  }

  &__text {
    font-size: 0.875rem;
  }
}
</style>
