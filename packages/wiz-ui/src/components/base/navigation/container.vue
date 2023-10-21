<template>
  <div
    :class="navigationContainerStyle"
    :style="{
      ...computedFixedStyle,
      width: computedWidth,
    }"
  >
    <div :class="navigationContainerItemsStyle">
      <slot />
    </div>
    <div v-if="isOpen && slots.footer" :class="navigationContainerFooterStyle">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationContainerStyle,
  navigationContainerItemsStyle,
  navigationContainerFooterStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, useSlots } from "vue";
import { StyleValue } from "vue/types/jsx";

defineOptions({
  name: ComponentName.NavigationContainer,
});

const slots = useSlots();

const props = defineProps({
  width: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const computedWidth = computed(() => {
  if (props.width) return props.width;
  if (props.isOpen) return "180px";
  return `calc(${THEME.spacing.xl} * 2 + ${THEME.spacing.sm})`;
});

const computedFixedStyle = computed(() => {
  const styles: StyleValue = {};
  if (props.fixed) styles.position = "fixed";
  if (props.fixed) styles.top = `calc(${THEME.share.HEADER_HEIGHT} + 1px)`; // +1px for border of header
  if (props.fixed) styles.left = 0;
  if (props.fixed) styles.borderRight = `1px solid ${THEME.color.gray[400]}`;
  if (props.fixed)
    styles.height = `calc(100vh - ${THEME.share.HEADER_HEIGHT} - 1px)`;
  return styles;
});
</script>
