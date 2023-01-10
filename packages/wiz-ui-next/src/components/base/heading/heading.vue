<template>
  <component
    :is="headingHTML"
    :class="[
      headingStyle,
      fontSizeStyle[computedFontSize],
      colorStyle[computedColor],
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { headingStyle } from "@wizleap-inc/wiz-ui-styles/bases/heading.css";
import { colorStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType } from "vue";

defineOptions({
  name: ComponentName.Heading,
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const DEFAULT_FONT_SIZE: Record<HeadingLevel, FontSizeKeys> = {
  1: "xl2",
  2: "xl",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs2",
} as const;

const DEFAULT_COLOR: Record<HeadingLevel, ColorKeys> = {
  1: "gray.900",
  2: "gray.800",
  3: "gray.700",
  4: "gray.700",
  5: "gray.700",
  6: "gray.700",
} as const;

const props = defineProps({
  level: {
    type: Number as PropType<HeadingLevel>,
    required: false,
    default: 1,
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
  },
});

const computedFontSize = computed(() => {
  if (props.fontSize) return props.fontSize;
  return DEFAULT_FONT_SIZE[props.level];
});

const computedColor = computed(() => {
  if (props.color) return props.color;
  return DEFAULT_COLOR[props.level];
});

const headingHTML = computed(() => `h${props.level}`);
</script>
