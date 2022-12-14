<template>
  <div :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  getColorCss,
  ShadowKeys,
  getShadowCss,
  SpacingKeys,
  getSpacingCss,
  ZIndexKeys,
  getZIndexCss,
} from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";
import { StyleValue } from "vue/types/jsx";

defineOptions({
  name: ComponentName.Box,
});
interface Props {
  position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  round?: SpacingKeys;
  roundT?: SpacingKeys;
  roundR?: SpacingKeys;
  roundB?: SpacingKeys;
  roundL?: SpacingKeys;
  zIndex?: ZIndexKeys;
  bgColor?: ColorKeys;
  shadow?: ShadowKeys;
  dropShadow?: ShadowKeys;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  overflowX?: "visible" | "hidden" | "scroll" | "auto";
  overflowY?: "visible" | "hidden" | "scroll" | "auto";
  cursor?: "pointer" | "default";
  pointerEvents?: "auto" | "none";
  transform?: string;
  transition?: string;
  opacity?: number;
  scroll?: "none" | "x" | "y" | "block" | "inline" | "both";
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
  if (props.round) style.borderRadius = getSpacingCss(props.round);
  if (props.roundT) {
    style.borderRadius = `${getSpacingCss(props.roundT)} ${getSpacingCss(
      props.roundT
    )} 0 0`;
  }
  if (props.roundR) {
    style.borderRadius = `0 ${getSpacingCss(props.roundR)} ${getSpacingCss(
      props.roundR
    )} 0`;
  }
  if (props.roundB) {
    style.borderRadius = `0 0 ${getSpacingCss(props.roundB)} ${getSpacingCss(
      props.roundB
    )}`;
  }
  if (props.roundL) {
    style.borderRadius = `${getSpacingCss(props.roundL)} 0 0 ${getSpacingCss(
      props.roundL
    )}`;
  }
  if (props.zIndex) style.zIndex = getZIndexCss(props.zIndex);
  if (props.bgColor) style.backgroundColor = getColorCss(props.bgColor);
  if (props.shadow) style.boxShadow = getShadowCss(props.shadow);
  if (props.dropShadow)
    style.filter = `drop-shadow(${getShadowCss(props.dropShadow)})`;
  if (props.overflow) style.overflow = props.overflow;
  if (props.overflowX) style.overflowX = props.overflowX;
  if (props.overflowY) style.overflowY = props.overflowY;
  if (props.cursor) style.cursor = props.cursor;
  if (props.pointerEvents) style.pointerEvents = props.pointerEvents;
  if (props.transform) style.transform = props.transform;
  if (props.transition) style.transition = props.transition;
  if (props.opacity) style.opacity = props.opacity;
  if (props.scroll) {
    style.scrollSnapType = props.scroll;
    style.overflow = "scroll";
  }

  return style;
});
</script>
