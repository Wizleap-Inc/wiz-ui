<template>
  <div
    :class="[
      stackStyle,
      stackDirectionStyle[computedDirection],
      stackJustifyStyle[justify],
      stackAlignStyle[align],
      position && stackPositionStyle[position],
      wrap && stackWrapStyle,
      gx && gapXStyle[gx],
      gy && gapYStyle[gy],
      !gx && !gy && gap && gapStyle[gap],
      mx && marginXStyle[mx],
      my && marginYStyle[my],
      !mx && !my && m && marginStyle[m],
      mt && marginTopStyle[mt],
      mr && marginRightStyle[mr],
      mb && marginBottomStyle[mb],
      ml && marginLeftStyle[ml],
      px && paddingXStyle[px],
      py && paddingYStyle[py],
      !px && !py && p && paddingStyle[p],
      pt && paddingTopStyle[pt],
      pr && paddingRightStyle[pr],
      pb && paddingBottomStyle[pb],
      pl && paddingLeftStyle[pl],
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
import {
  stackStyle,
  stackDirectionStyle,
  stackJustifyStyle,
  stackAlignStyle,
  stackWrapStyle,
  stackPositionStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/stack.css";
import {
  gapStyle,
  gapXStyle,
  gapYStyle,
  marginStyle,
  marginXStyle,
  marginYStyle,
  marginTopStyle,
  marginRightStyle,
  marginBottomStyle,
  marginLeftStyle,
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  paddingTopStyle,
  paddingRightStyle,
  paddingBottomStyle,
  paddingLeftStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType } from "vue";

defineOptions({
  name: ComponentName.Stack,
});

const props = defineProps({
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    required: false,
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
