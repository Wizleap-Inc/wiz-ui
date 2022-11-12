<template>
  <div class="wiz-card">
    <slot v-if="!title" name="mainHeaderArea"></slot>
    <div class="wiz-card__title">{{ title }}</div>
    <slot name="subHeaderArea"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { THEME } from "@/constants/styles";
import { ColorKeys } from "@/types/styles/color";
import { SpacingKeys } from "@/types/styles/spacing";
import { getColorCss } from "@/utils/styles/color";
import { getSpacingCSS, getCoupleSpacingCSS } from "@/utils/styles/spacing";

interface Props {
  title?: string;
  hint?: string;
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  backgroundColor?: ColorKeys;
  shadow?: boolean;
  align?: "start" | "center" | "end";
}

const props = withDefaults(defineProps<Props>(), {
  p: "md",
  backgroundColor: "white.800",
  shadow: false,
  align: "end",
});

const computedPadding = computed(() => {
  if (props.p) {
    return getSpacingCSS(props.p);
  }
  return getCoupleSpacingCSS(props.px, props.py);
});

const computedBackgroundColor = computed(() =>
  getColorCss(props.backgroundColor)
);

const colorGray400 = THEME.color.gray["400"];
const colorGray700 = THEME.color.gray["700"];
const fontSizeMd = THEME.fontSize.md;
const spacingXs2 = THEME.spacing.xs2;
const shadowMd = THEME.shadow.md;
</script>

<style lang="scss" scoped>
.wiz-card {
  background-color: v-bind(computedBackgroundColor);
  padding: v-bind(computedPadding);
  box-shadow: v-bind(shadowMd);
  border: 1px solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;

  &__title {
    font-size: v-bind(fontSizeMd);
    font-weight: 700;
    color: v-bind(colorGray700);
  }
}
</style>
