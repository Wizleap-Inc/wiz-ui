<template>
  <component
    :is="headingHTML"
    class="wiz-heading"
    :style="{
      'font-size': computedFontSize,
      color: computedColor,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

import { FontSizeKeys, FONT_SIZE_MAP } from "@/constants/styles/fontSize";
import { ColorKeys } from "@/types/styles/color";
import { getColorCss } from "@/utils/styles/color";

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
});

const computedFontSize = computed(() => {
  if (props.fontSize) return FONT_SIZE_MAP[props.fontSize];
  if (props.level === 1) return FONT_SIZE_MAP["xl2"];
  if (props.level === 2) return FONT_SIZE_MAP["xl"];
  if (props.level === 3) return FONT_SIZE_MAP["md"];
  if (props.level === 4) return FONT_SIZE_MAP["sm"];
  if (props.level === 5) return FONT_SIZE_MAP["xs"];
  if (props.level === 6) return FONT_SIZE_MAP["xs2"];
  return FONT_SIZE_MAP["md"];
});

const computedColor = computed(() => {
  if (props.color) return getColorCss(props.color);
  if (props.level === 1) return getColorCss("gray.900");
  if (props.level === 2) return getColorCss("gray.800");
  return getColorCss("gray.700");
});

const headingHTML = computed(() => `h${props.level}`);
</script>

<style lang="scss" scoped>
.wiz-heading {
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}
</style>
