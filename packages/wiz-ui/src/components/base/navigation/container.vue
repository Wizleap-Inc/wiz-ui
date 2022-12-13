<template>
  <div class="wiz-navigation-container" :style="computedStickyStyle">
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
import { THEME } from "@wiz-ui/constants";
import { ComponentName } from "@wiz-ui/constants/component/name";
import { computed, useSlots } from "vue";
import { StyleValue } from "vue/types/jsx";

import { globalInject, globalKey } from "@/providers";

defineOptions({
  name: ComponentName.NavigationContainer,
});

const { isMenuOpen } = globalInject(globalKey);

const slots = useSlots();

interface Props {
  width?: string;
  sticky?: boolean;
}
const props = defineProps<Props>();

const computedWidth = computed(() => {
  if (props.width) return props.width;
  if (isMenuOpen.value) return "180px";
  return `calc(${THEME.spacing.xl} * 2 + ${THEME.spacing.sm})`;
});

const computedStickyStyle = computed(() => {
  const styles: StyleValue = {};
  if (props.sticky) styles.position = "sticky";
  if (props.sticky) styles.top = `calc(${THEME.share.HEADER_HEIGHT} + 1px)`; // +1px for border of header
  if (props.sticky) styles.left = 0;
  if (props.sticky) styles.borderRight = `1px solid ${THEME.color.gray[400]}`;
  if (props.sticky)
    styles.height = `calc(100vh - ${THEME.share.HEADER_HEIGHT} - 1px)`;
  return styles;
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
  flex-shrink: 0;
  height: 100%;
  transition: width 0.2s ease-in-out;
  overflow: hidden;

  &__items {
    display: flex;
    flex-direction: column;
  }

  &__footer {
    padding: v-bind(spacingXl2);
  }
}
</style>
