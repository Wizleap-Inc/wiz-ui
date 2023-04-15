<template>
  <div
    :class="[
      styles.stackStyle,
      styles.stackDirectionStyle[computedDirection],
      styles.stackJustifyStyle[justify],
      styles.stackAlignStyle[align],
      position && styles.stackPositionStyle[position],
      wrap && styles.stackWrapStyle,
      gx && commonStyles.gapXStyle[gx],
      gy && commonStyles.gapYStyle[gy],
      !gx && !gy && gap && commonStyles.gapStyle[gap],
      mx && commonStyles.marginXStyle[mx],
      my && commonStyles.marginYStyle[my],
      !mx && !my && m && commonStyles.marginStyle[m],
      mt && commonStyles.marginTopStyle[mt],
      mr && commonStyles.marginRightStyle[mr],
      mb && commonStyles.marginBottomStyle[mb],
      ml && commonStyles.marginLeftStyle[ml],
      px && commonStyles.paddingXStyle[px],
      py && commonStyles.paddingYStyle[py],
      !px && !py && p && commonStyles.paddingStyle[p],
      pt && commonStyles.paddingTopStyle[pt],
      pr && commonStyles.paddingRightStyle[pr],
      pb && commonStyles.paddingBottomStyle[pb],
      pl && commonStyles.paddingLeftStyle[pl],
    ]"
    :style="{
      width,
      height,
      overflow,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/stack.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType } from "vue";

defineOptions({
  name: ComponentName.Stack,
});

const props = defineProps({
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    required: false,
    default: "horizontal",
  },
  align: {
    type: String as PropType<"start" | "center" | "end" | "stretch">,
    required: false,
    default: "stretch",
  },
  justify: {
    type: String as PropType<
      "start" | "center" | "end" | "between" | "around" | "evenly"
    >,
    required: false,
    default: "start",
  },
  wrap: {
    type: Boolean,
    required: false,
    default: true,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  gx: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  gy: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  p: { type: String as PropType<SpacingKeys>, required: false },
  pt: { type: String as PropType<SpacingKeys>, required: false },
  pr: { type: String as PropType<SpacingKeys>, required: false },
  pb: { type: String as PropType<SpacingKeys>, required: false },
  pl: { type: String as PropType<SpacingKeys>, required: false },
  px: { type: String as PropType<SpacingKeys>, required: false },
  py: { type: String as PropType<SpacingKeys>, required: false },
  m: { type: String as PropType<SpacingKeys>, required: false },
  mt: { type: String as PropType<SpacingKeys>, required: false },
  mr: { type: String as PropType<SpacingKeys>, required: false },
  mb: { type: String as PropType<SpacingKeys>, required: false },
  ml: { type: String as PropType<SpacingKeys>, required: false },
  mx: { type: String as PropType<SpacingKeys>, required: false },
  my: { type: String as PropType<SpacingKeys>, required: false },
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  height: {
    type: String,
    required: false,
    default: "auto",
  },
  overflow: {
    type: String,
    required: false,
    default: "visible",
  },
  reverse: {
    type: Boolean,
    required: false,
  },
  position: {
    type: String as PropType<
      "relative" | "absolute" | "fixed" | "sticky" | "static"
    >,
    required: false,
  },
});

const computedDirection = computed(() => {
  if (props.direction === "horizontal") {
    return props.reverse ? "horizontalReverse" : "horizontal";
  }
  return props.reverse ? "verticalReverse" : "vertical";
});
</script>
