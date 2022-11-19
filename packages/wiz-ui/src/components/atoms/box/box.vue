<template>
  <div :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { StyleValue } from "vue/types/jsx";

import { ColorKeys } from "@/types/styles/color";
import { ShadowKeys } from "@/types/styles/shadow";
import { SpacingKeys } from "@/types/styles/spacing";
import { ZIndexKeys } from "@/types/styles/z-index";

interface Props {
  position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  borderRadius?: SpacingKeys;
  zIndex?: ZIndexKeys;
  backgroundColor?: ColorKeys;
  boxShadow?: ShadowKeys;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
  cursor?: "pointer" | "default";
  pointerEvents?: "auto" | "none";
  transform?: string;
  transition?: string;
}

const props = defineProps<Props>();

const computedStyle = computed(() => {
  const style: StyleValue = {};

  if (props.position) style.position = props.position;
  if (props.top) style.top = props.top;
  if (props.right) style.right = props.right;
  if (props.bottom) style.bottom = props.bottom;
  if (props.left) style.left = props.left;
  if (props.width) style.width = props.width;
  if (props.height) style.height = props.height;
  if (props.borderRadius) style.borderRadius = props.borderRadius;
  if (props.zIndex) style.zIndex = `${props.zIndex}`;
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
  if (props.boxShadow) style.boxShadow = props.boxShadow;
  if (props.overflow) style.overflow = props.overflow;
  if (props.overflowX) style.overflowX = props.overflowX;
  if (props.overflowY) style.overflowY = props.overflowY;
  if (props.cursor) style.cursor = props.cursor;
  if (props.pointerEvents) style.pointerEvents = props.pointerEvents;
  if (props.transform) style.transform = props.transform;
  if (props.transition) style.transition = props.transition;

  return style;
});
</script>
