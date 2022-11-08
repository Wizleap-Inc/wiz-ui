<template>
  <a class="wiz-anchor" :href="href" :target="target" :rel="rel">
    <component v-if="icon" :is="icon" />
    <slot />
  </a>
</template>

<script setup lang="ts">
import Vue, { computed, withDefaults } from "vue";

import { FONT_SIZE_MAP } from "@/constants/styles/fontSize";
import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/fontSize";
import { getColorCss } from "@/utils/styles/color";

interface Props {
  href: string;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  target?: "_blank" | "_self";
  icon?: Vue;
}

const props = withDefaults(defineProps<Props>(), {
  href: "#",
  color: "blue.800",
  fontSize: "md",
  fontWeight: "normal",
  target: "_self",
});

const rel = computed(() => {
  if (props.target === "_blank") {
    return "noopener noreferrer";
  }
  return undefined;
});

const computedColor = computed(() => {
  return getColorCss(props.color);
});

const computedFontSize = computed(() => {
  return FONT_SIZE_MAP[props.fontSize];
});

const computedFontWeight = computed(() => props.fontWeight);
</script>

<style lang="scss" scoped>
.wiz-anchor {
  line-height: 1.5;
  margin: 0;
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
  text-decoration: none;

  &:hover {
    // 未定
  }

  &:active {
    // 未定
  }

  & > svg {
    fill: v-bind(computedColor);
    vertical-align: top;
  }
}
</style>
