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
import { getColorCss } from "@/utils/styles/color";
import { getShadowCss } from "@/utils/styles/shadow";
import { getSpacingCSS } from "@/utils/styles/spacing";
import { getZIndexCSS } from "@/utils/styles/z-index";

interface Props {
  position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  round?: SpacingKeys;
  zIndex?: ZIndexKeys;
  bgColor?: ColorKeys;
  shadow?: ShadowKeys;
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
  if (props.round) style.borderRadius = getSpacingCSS(props.round);
  if (props.zIndex) style.zIndex = getZIndexCSS(props.zIndex);
  if (props.bgColor) style.backgroundColor = getColorCss(props.bgColor);
  if (props.shadow) style.boxShadow = getShadowCss(props.shadow);
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
