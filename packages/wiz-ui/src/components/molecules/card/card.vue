<template>
  <div class="wiz-card">
    <WizVStack gap="md">
      <div class="wiz-card__header">
        <WizHStack gap="xs2" class="wiz-card__header-main">
          <slot v-if="!title" name="mainHeaderArea"></slot>
          <div class="wiz-card__header-title">{{ title }}</div>
          <component v-if="hint" :is="WizIHint" />
        </WizHStack>
        <slot name="subHeaderArea"></slot>
      </div>
      <slot></slot>
      <div class="wiz-card__footer">
        <slot name="footer"></slot>
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import WizHStack from "@/components/atoms/stack/h-stack.vue";
import WizVStack from "@/components/atoms/stack/v-stack.vue";
import WizIHint from "@/components/icons/hint.vue";
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

const computedShadow = computed(() => props.shadow);
const computedAlign = computed(() => props.align);
const colorGray400 = THEME.color.gray["400"];
const colorGray700 = THEME.color.gray["700"];
const fontSizeMd = THEME.fontSize.md;
const spacingXs2 = THEME.spacing.xs2;
const shadowMd = THEME.shadow.md;
</script>

<style lang="scss" scoped>
$shadow: v-bind(computedShadow);

.wiz-card {
  width: 100%;
  background-color: v-bind(computedBackgroundColor);
  padding: v-bind(computedPadding);
  border: 1px solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__header-main {
    display: flex;
    align-items: center;
  }

  &__header-title {
    font-size: v-bind(fontSizeMd);
    font-weight: 700;
    color: v-bind(colorGray700);
  }

  &__footer {
    text-align: v-bind(computedAlign);
  }
}

@if $shadow {
  .wiz-card {
    box-shadow: v-bind(shadowMd);
  }
}
</style>
