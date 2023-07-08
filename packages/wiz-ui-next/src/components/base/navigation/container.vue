<template>
  <div
    :class="navigationContainerStyle"
    :style="{
      ...computedStickyStyle,
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
import { computed, StyleValue, useSlots } from "vue";

defineOptions({
  name: ComponentName.NavigationContainer,
});

const slots = useSlots();

const props = defineProps({
  width: {
    type: String,
    required: false,
  },
  sticky: {
    type: Boolean,
    requird: false,
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
</script>
