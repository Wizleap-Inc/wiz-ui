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

import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/fontSize";
import { getColorCss } from "@/utils/styles/color";
import { getFontSizeCss } from "@/utils/styles/fontSize";

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
});

const computedFontSize = computed(() => {
  if (props.fontSize) return getFontSizeCss(props.fontSize);
  if (props.level === 1) return getFontSizeCss("xl2");
  if (props.level === 2) return getFontSizeCss("xl");
  if (props.level === 3) return getFontSizeCss("md");
  if (props.level === 4) return getFontSizeCss("sm");
  if (props.level === 5) return getFontSizeCss("xs");
  if (props.level === 6) return getFontSizeCss("xs2");
  return getFontSizeCss("md");
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
