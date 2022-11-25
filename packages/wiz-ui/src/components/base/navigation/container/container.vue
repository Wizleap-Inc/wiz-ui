<template>
  <div class="wiz-navigation-container">
    <div class="wiz-navigation-container__items">
      <slot />
    </div>
    <div
      v-if="isMenuOpen && slots.footer"
      class="wiz-navigation-container__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from "vue";

import { THEME } from "@/constants";

import { key, useProvide } from "../provider";

const provider = useProvide();
const { isMenuOpen } = provider;
provide(key, provider);

const slots = useSlots();

interface Props {
  width?: string;
}
const props = defineProps<Props>();

const computedWidth = computed(() => {
  if (props.width) return props.width;
  if (isMenuOpen.value) return "180px";
  return "64px";
});
const spacingXl2 = THEME.spacing.xl2;
const white500 = THEME.color.white["500"];
</script>

<style lang="scss" scoped>
.wiz-navigation-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: v-bind(white500);
  width: v-bind(computedWidth);
  height: 100%;

  &__items {
    display: flex;
    flex-direction: column;
  }

  &__footer {
    padding: v-bind(spacingXl2);
  }
}
</style>
