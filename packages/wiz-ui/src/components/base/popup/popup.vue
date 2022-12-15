<template>
  <div
    v-show="isPopupOpen"
    :class="{
      'wiz-popup': true,
      'wiz-popup--direction-tl': computedDirection === 'tl',
      'wiz-popup--direction-tr': computedDirection === 'tr',
      'wiz-popup--direction-bl': computedDirection === 'bl',
      'wiz-popup--direction-br': computedDirection === 'br',
      'wiz-popup--direction-rt': computedDirection === 'rt',
      'wiz-popup--direction-rb': computedDirection === 'rb',
      'wiz-popup--direction-lt': computedDirection === 'lt',
      'wiz-popup--direction-lb': computedDirection === 'lb',
    }"
    ref="popupRef"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  THEME,
  ComponentName,
  SpacingKeys,
  getSpacingCss,
  ZIndexKeys,
  getZIndexCss,
} from "@wizleap-inc/wiz-ui-constants";
import { computed, inject, ref } from "vue";

import { POPUP_KEY } from "./provider";

defineOptions({
  name: ComponentName.Popup,
});

interface Props {
  layer: ZIndexKeys;
  gap?: SpacingKeys;
  /**
   * ```
   * b = bottom
   * t = top
   * l = left
   * r = right
   *
   * 例)
   * - tl = 上方向に出て、左寄せ
   * - rb = 右方向に出て、下寄せ
   *
   * default: bl
   * ```
   */
  direction?: "tl" | "tr" | "bl" | "br" | "rt" | "rb" | "lt" | "lb";
}

const props = withDefaults(defineProps<Props>(), {
  gap: "no",
  direction: "bl",
});

const popupRef = ref<HTMLElement | undefined>();

const injected = inject(POPUP_KEY);

if (!injected) {
  throw new Error(
    `${ComponentName.Popup}は${ComponentName.PopupContainer}の中で使用する必要があります。`
  );
}

const { isPopupOpen, bodyPxInfo } = injected;

const popupRect = computed(() => {
  const popupWidth = popupRef.value?.offsetWidth ?? 0;
  const popupHeight = popupRef.value?.offsetHeight ?? 0;

  const popupLeft = (() => {
    if (props.direction === "tl" || props.direction === "bl") {
      return bodyPxInfo.left;
    }
    if (props.direction === "tr" || props.direction === "br") {
      return bodyPxInfo.right - popupWidth;
    }
    if (props.direction === "rt" || props.direction === "rb") {
      return bodyPxInfo.right;
    }
    if (props.direction === "lt" || props.direction === "lb") {
      return bodyPxInfo.left - popupWidth;
    }
    return 0;
  })();

  const popupTop = (() => {
    if (props.direction === "tl" || props.direction === "tr") {
      return bodyPxInfo.top;
    }
    if (props.direction === "bl" || props.direction === "br") {
      return bodyPxInfo.bottom - popupHeight;
    }
    if (props.direction === "rt" || props.direction === "lt") {
      return bodyPxInfo.top - popupHeight;
    }
    if (props.direction === "rb" || props.direction === "lb") {
      return bodyPxInfo.bottom;
    }
    return 0;
  })();

  return {
    width: popupWidth,
    height: popupHeight,
    left: popupLeft,
    top: popupTop,
    right: popupLeft + popupWidth,
    bottom: popupTop + popupHeight,
  };
});

const spaceBetweenPopupAndWindow = computed(() => {
  const { top, right, bottom, left } = popupRect.value;
  const { innerHeight, innerWidth } = window;
  if (props.direction === "bl") {
    return { x: innerWidth - right, y: innerHeight - bottom };
  }
  if (props.direction === "br") {
    return { x: left, y: innerHeight - bottom };
  }
  if (props.direction === "tl") {
    return { x: innerWidth - right, y: top };
  }
  if (props.direction === "tr") {
    return { x: left, y: top };
  }
  if (props.direction === "rt") {
    return { x: innerWidth - right, y: innerHeight - bottom };
  }
  if (props.direction === "rb") {
    return { x: innerWidth - right, y: top };
  }
  if (props.direction === "lt") {
    return { x: left, y: innerHeight - bottom };
  }
  if (props.direction === "lb") {
    return { x: left, y: top };
  }
  return { x: 0, y: 0 };
});

const computedDirection = computed(() => {
  const { x, y } = spaceBetweenPopupAndWindow.value;
  const height = popupRect.value.height;
  const width = popupRect.value.width;
  if (props.direction === "bl") {
    if (x < 0 && y < height) return "tr";
    if (x < 0) return "br";
    if (y < height) return "tl";
  }
  if (props.direction === "tl") {
    if (x < 0 && y < height) return "br";
    if (x < 0) return "tr";
    if (y < height) return "bl";
  }
  if (props.direction === "br") {
    if (x < 0 && y < height) return "tl";
    if (x < 0) return "bl";
    if (y < height) return "tr";
  }
  if (props.direction === "tr") {
    if (x < 0 && y < height) return "bl";
    if (x < 0) return "tl";
    if (y < height) return "br";
  }
  if (props.direction === "rt") {
    if (x < width && y < height) return "lb";
    if (x < width) return "lt";
    if (y < height) return "rb";
  }
  if (props.direction === "rb") {
    if (x < width && y < height) return "lt";
    if (x < width) return "lb";
    if (y < height) return "rt";
  }
  if (props.direction === "lt") {
    if (x < width && y < height) return "rb";
    if (x < width) return "rt";
    if (y < height) return "lb";
  }
  if (props.direction === "lb") {
    if (x < width && y < height) return "rt";
    if (x < width) return "rb";
    if (y < height) return "lt";
  }
  return props.direction;
});

const computedZIndex = computed(() => getZIndexCss(props.layer));
const shadowSm = THEME.shadow.sm;
const computedMargin = computed(() => getSpacingCss(props.gap));
</script>

<style lang="scss" scoped>
.wiz-popup {
  position: absolute;
  z-index: v-bind(computedZIndex);
  filter: drop-shadow(v-bind(shadowSm));
  width: max-content;

  &--direction-tl {
    bottom: 100%;
    left: 0;
    margin: v-bind(computedMargin) 0;
  }

  &--direction-tr {
    bottom: 100%;
    right: 0;
    margin: v-bind(computedMargin) 0;
  }

  &--direction-bl {
    top: 100%;
    left: 0;
    margin: v-bind(computedMargin) 0;
  }

  &--direction-br {
    top: 100%;
    right: 0;
    margin: v-bind(computedMargin) 0;
  }

  &--direction-rt {
    top: 0;
    left: 100%;
    margin: 0 v-bind(computedMargin);
  }

  &--direction-rb {
    bottom: 0;
    left: 100%;
    margin: 0 v-bind(computedMargin);
  }

  &--direction-lt {
    top: 0;
    right: 100%;
    margin: 0 v-bind(computedMargin);
  }

  &--direction-lb {
    bottom: 0;
    right: 100%;
    margin: 0 v-bind(computedMargin);
  }
}
</style>
