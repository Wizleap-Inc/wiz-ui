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

const computedDirection = computed(() => {
  if (props.direction === "horizontal") {
    return props.reverse ? "horizontalReverse" : "horizontal";
  }
  return props.reverse ? "verticalReverse" : "vertical";
});
</script>
