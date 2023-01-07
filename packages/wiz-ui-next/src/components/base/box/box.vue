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
import { computed, PropType, StyleValue } from "vue";

defineOptions({
  name: ComponentName.Box,
});
interface Props {
  position: "absolute" | "relative" | "fixed" | "sticky" | "static";
  top: string;
  right: string;
  bottom: string;
  left: string;
  width: string;
  height: string;
  round: SpacingKeys;
  roundT: SpacingKeys;
  roundR: SpacingKeys;
  roundB: SpacingKeys;
  roundL: SpacingKeys;
  zIndex: ZIndexKeys;
  bgColor: ColorKeys;
  shadow: ShadowKeys;
  dropShadow: ShadowKeys;
  overflow: "visible" | "hidden" | "scroll" | "auto";
  overflowX: "visible" | "hidden" | "scroll" | "auto";
  overflowY: "visible" | "hidden" | "scroll" | "auto";
  cursor: "pointer" | "default";
  pointerEvents: "auto" | "none";
  transform: string;
  transition: string;
  opacity: number;
  scroll: "none" | "x" | "y" | "block" | "inline" | "both";
}

const props = defineProps({
  position: {
    type: String as PropType<Props["position"]>,
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
  height: {
    type: String,
    required: false,
  },
  round: {
    type: String as PropType<Props["round"]>,
    required: false,
  },
  roundT: {
    type: String as PropType<Props["roundT"]>,
    required: false,
  },
  roundL: {
    type: String as PropType<Props["roundL"]>,
    required: false,
  },
  roundR: {
    type: String as PropType<Props["roundR"]>,
    required: false,
  },
  roundB: {
    type: String as PropType<Props["roundB"]>,
    required: false,
  },
  zIndex: {
    type: String as PropType<Props["zIndex"]>,
    required: false,
  },
  bgColor: {
    type: String as PropType<Props["bgColor"]>,
    required: false,
  },
  shadow: {
    type: String as PropType<Props["shadow"]>,
    required: false,
  },
  dropShadow: {
    type: String as PropType<Props["dropShadow"]>,
    required: false,
  },
  overflow: {
    type: String as PropType<Props["overflow"]>,
    required: false,
  },
  overflowX: {
    type: String as PropType<Props["overflowX"]>,
    required: false,
  },
  overflowY: {
    type: String as PropType<Props["overflowY"]>,
    required: false,
  },
  cursor: {
    type: String as PropType<Props["cursor"]>,
    required: false,
  },
  pointerEvents: {
    type: String as PropType<Props["pointerEvents"]>,
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
  scroll: {
    type: String as PropType<Props["scroll"]>,
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
  if (props.zIndex) style.zIndex = +getZIndexCss(props.zIndex);
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
