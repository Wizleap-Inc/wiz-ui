<template>
  <div
    :class="{
      'wiz-stack': true,
      'wiz-stack--vertical': direction === 'vertical' && !reverse,
      'wiz-stack--horizontal': direction === 'horizontal' && !reverse,
      'wiz-stack--vertical-reverse': direction === 'vertical' && reverse,
      'wiz-stack--horizontal-reverse': direction === 'horizontal' && reverse,
      'wiz-stack--align-start': align === 'start',
      'wiz-stack--align-center': align === 'center',
      'wiz-stack--align-end': align === 'end',
      'wiz-stack--align-stretch': align === 'stretch',
      'wiz-stack--justify-start': justify === 'start',
      'wiz-stack--justify-center': justify === 'center',
      'wiz-stack--justify-end': justify === 'end',
      'wiz-stack--justify-between': justify === 'between',
      'wiz-stack--justify-around': justify === 'around',
      'wiz-stack--justify-evenly': justify === 'evenly',
      'wiz-stack--wrap': wrap,
    }"
    :style="{
      ...computedSpacingStyles,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import {
  getSpacingCss,
  getCoupleSpacingCss,
} from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import { computed } from "vue";

defineOptions({
  name: ComponentName.Stack,
});

interface Props {
  direction?: "horizontal" | "vertical";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: SpacingKeys;
  gx?: SpacingKeys;
  gy?: SpacingKeys;
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
  width?: string;
  height?: string;
  overflow?: string;
  reverse?: boolean;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
}

const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
  align: "stretch",
  justify: "start",
  wrap: true,
  width: "auto",
  height: "auto",
  overflow: "visible",
});

const computedSpacingStyles = computed(() => {
  const spacingStyles = {
    gap: getSpacingCss(props.gap) || getCoupleSpacingCss(props.gx, props.gy),
    padding: getSpacingCss(props.p) || getCoupleSpacingCss(props.px, props.py),
    paddingTop: getSpacingCss(props.pt),
    paddingRight: getSpacingCss(props.pr),
    paddingBottom: getSpacingCss(props.pb),
    paddingLeft: getSpacingCss(props.pl),
    margin: getSpacingCss(props.m) || getCoupleSpacingCss(props.mx, props.my),
    marginTop: getSpacingCss(props.mt),
    marginRight: getSpacingCss(props.mr),
    marginBottom: getSpacingCss(props.mb),
    marginLeft: getSpacingCss(props.ml),
  };

  const isSpacingStylesKey = (key: string): key is keyof typeof spacingStyles =>
    key in spacingStyles;

  for (const key in spacingStyles) {
    if (isSpacingStylesKey(key) && !spacingStyles[key])
      delete spacingStyles[key];
  }

  return spacingStyles;
});

const computedWidth = computed(() => props.width);
const computedHeight = computed(() => props.height);
const computedOverflow = computed(() => props.overflow);
const computedPosition = computed(() => props.position);
</script>

<style lang="scss" scoped>
.wiz-stack {
  display: flex;
  width: v-bind(computedWidth);
  height: v-bind(computedHeight);
  overflow: v-bind(computedOverflow);
  position: v-bind(computedPosition);

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--vertical-reverse {
    flex-direction: column-reverse;
  }

  &--horizontal-reverse {
    flex-direction: row-reverse;
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-stretch {
    align-items: stretch;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-between {
    justify-content: space-between;
  }

  &--justify-around {
    justify-content: space-around;
  }

  &--justify-evenly {
    justify-content: space-evenly;
  }

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
