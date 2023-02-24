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
import { computed, PropType } from "vue";
import { StyleValue } from "vue/types/jsx";

defineOptions({
  name: ComponentName.Box,
});

const props = defineProps({
  position: {
    type: String as PropType<
      "absolute" | "relative" | "fixed" | "sticky" | "static"
    >,
    required: false,
  },
  top: {
    type: String,
    required: false,
  },
  right: {
    type: String,
    required: false,
  },
  left: {
    type: String,
    required: false,
  },
  bottom: {
    type: String,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
  minWidth: {
    type: String,
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  minHeight: {
    type: String,
    required: false,
  },
  maxHeight: {
    type: String,
    required: false,
  },
  round: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  roundT: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  roundL: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  roundR: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  roundB: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  zIndex: {
    type: String as PropType<ZIndexKeys>,
    required: false,
  },
  bgColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  shadow: {
    type: String as PropType<ShadowKeys>,
    required: false,
  },
  dropShadow: {
    type: String as PropType<ShadowKeys>,
    required: false,
  },
  overflow: {
    type: String as PropType<"visible" | "hidden" | "scroll" | "auto">,
    required: false,
  },
  overflowX: {
    type: String as PropType<"visible" | "hidden" | "scroll" | "auto">,
    required: false,
  },
  overflowY: {
    type: String as PropType<"visible" | "hidden" | "scroll" | "auto">,
    required: false,
  },
  cursor: {
    type: String as PropType<"pointer" | "default">,
    required: false,
  },
  pointerEvents: {
    type: String as PropType<"auto" | "none">,
    required: false,
  },
  transform: {
    type: String,
    required: false,
  },
  transition: {
    type: String,
    required: false,
  },
  opacity: {
    type: Number,
    required: false,
  },
  snapScroll: {
    type: String as PropType<"none" | "x" | "y" | "block" | "inline" | "both">,
    required: false,
  },
  backdropBlur: {
    type: String as PropType<Exclude<SpacingKeys, "at">>,
    required: false,
  },
});

const computedStyle = computed(() => {
  const style: StyleValue = {};

  if (props.position) style.position = props.position;
  if (props.top) style.top = props.top;
  if (props.right) style.right = props.right;
  if (props.bottom) style.bottom = props.bottom;
  if (props.left) style.left = props.left;
  if (props.width) style.width = props.width;
  if (props.minWidth) style.minWidth = props.minWidth;
  if (props.maxWidth) style.maxWidth = props.maxWidth;
  if (props.height) style.height = props.height;
  if (props.minHeight) style.minHeight = props.minHeight;
  if (props.maxHeight) style.maxHeight = props.maxHeight;
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
  if (props.snapScroll) {
    style.scrollSnapType = props.snapScroll;
    style.overflow = "scroll";
  }
  if (props.backdropBlur)
    style.backdropFilter = getSpacingCss(props.backdropBlur);

  return style;
});
</script>
