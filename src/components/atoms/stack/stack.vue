<template>
  <div
    :class="{
      'wiz-stack': true,
      'wiz-stack--vertical': direction === 'vertical',
      'wiz-stack--horizontal': direction === 'horizontal',
    }"
    :style="computedSpacingStyles"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { SpacingKeys } from "@/types/styles/spacing";
import { getSpacingCSS } from "@/utils/styles/spacing";

interface Props {
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  p?: SpacingKeys;
  pt?: SpacingKeys;
  pr?: SpacingKeys;
  pb?: SpacingKeys;
  pl?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  m?: SpacingKeys;
  mt?: SpacingKeys;
  mr?: SpacingKeys;
  mb?: SpacingKeys;
  ml?: SpacingKeys;
  mx?: SpacingKeys;
  my?: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
  gap: "md",
});

const computedSpacingStyles = computed(() => {
  const spacingStyles = {
    gap: getSpacingCSS(props.gap),
    padding: getSpacingCSS(props.p),
    paddingTop: getSpacingCSS(props.pt),
    paddingRight: getSpacingCSS(props.pr),
    paddingBottom: getSpacingCSS(props.pb),
    paddingLeft: getSpacingCSS(props.pl),
    paddingX: getSpacingCSS(props.px),
    paddingY: getSpacingCSS(props.py),
    margin: getSpacingCSS(props.m),
    marginTop: getSpacingCSS(props.mt),
    marginRight: getSpacingCSS(props.mr),
    marginBottom: getSpacingCSS(props.mb),
    marginLeft: getSpacingCSS(props.ml),
    marginX: getSpacingCSS(props.mx),
    marginY: getSpacingCSS(props.my),
  };

  const isSpacingStylesKey = (key: string): key is keyof typeof spacingStyles =>
    key in spacingStyles;

  for (const key in spacingStyles) {
    if (isSpacingStylesKey(key) && !spacingStyles[key])
      delete spacingStyles[key];
  }

  return spacingStyles;
});
</script>

<style lang="scss" scoped>
.wiz-stack {
  display: flex;

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }
}
</style>
