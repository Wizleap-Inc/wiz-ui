<template>
  <teleport to="body" :disabled="!isPopupOpen">
    <div
      v-show="isPopupOpen"
      :class="[popupStyle, zIndexStyle[layer]]"
      :style="{
        inset,
        transform: popupTranslate,
      }"
      ref="popupRef"
    >
      <slot />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {
  ComponentName,
  getSpacingCss,
  SpacingKeys,
  ZIndexKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { popupStyle } from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, inject, PropType, ref } from "vue";

import { POPUP_KEY } from "./provider";

type Direction = "tl" | "tr" | "bl" | "br" | "rt" | "rb" | "lt" | "lb";
type DirectionChar = Direction extends `${infer X}${infer Y}` ? X | Y : never;

defineOptions({
  name: ComponentName.Popup,
});

const props = defineProps({
  layer: {
    type: String as PropType<Exclude<ZIndexKeys, "base" | "dialog">>,
    required: false,
    default: "floating",
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
  },
  direction: {
    type: String as PropType<Direction>,
    required: false,
    default: "bl",
  },
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
  const { scrollHeight, scrollWidth } = document.body;
  if (props.direction === "bl") {
    return { x: scrollWidth - right, y: scrollHeight - bottom };
  }
  if (props.direction === "br") {
    return { x: left, y: scrollHeight - bottom };
  }
  if (props.direction === "tl") {
    return { x: scrollWidth - right, y: top };
  }
  if (props.direction === "tr") {
    return { x: left, y: top };
  }
  if (props.direction === "rt") {
    return { x: scrollWidth - right, y: scrollHeight - bottom };
  }
  if (props.direction === "rb") {
    return { x: scrollWidth - right, y: top };
  }
  if (props.direction === "lt") {
    return { x: left, y: scrollHeight - bottom };
  }
  if (props.direction === "lb") {
    return { x: left, y: top };
  }
  return { x: 0, y: 0 };
});

const isDirectionChar = (char: string): char is DirectionChar => {
  return ["t", "b", "l", "r"].includes(char);
};

const directionToTuple = (
  direction: Direction
): [DirectionChar, DirectionChar] => {
  const [x, y] = direction.split("");
  if (!isDirectionChar(x) || !isDirectionChar(y)) {
    throw new Error("Invalid direction");
  }
  return [x, y];
};

const convertDirection = (char: DirectionChar) => {
  if (char === "t") return "b";
  if (char === "b") return "t";
  if (char === "l") return "r";
  if (char === "r") return "l";
  return char;
};

const computedDirection = computed(() => {
  const chars = directionToTuple(props.direction);
  const { x, y } = spaceBetweenPopupAndWindow.value;
  const height = popupRect.value.height;
  const width = popupRect.value.width;
  return chars
    .map((char) => {
      if (char === "t" && y < height) return convertDirection(char);
      if (char === "b" && y < height) return convertDirection(char);
      if (char === "l" && x < width) return convertDirection(char);
      if (char === "r" && x < width) return convertDirection(char);
      return char;
    })
    .join("") as Direction;
});

const inset = computed(() => {
  const firstBTop = bodyPxInfo.top + bodyPxInfo.height;
  const secondBTop =
    bodyPxInfo.top - popupRect.value.height + bodyPxInfo.height;
  const firstTTop = bodyPxInfo.top - popupRect.value.height;
  const secondTTop = bodyPxInfo.top;
  const firstRLeft = bodyPxInfo.left + bodyPxInfo.width;
  const secondRLeft =
    bodyPxInfo.left - popupRect.value.width + bodyPxInfo.width;
  const firstLLeft = bodyPxInfo.left - popupRect.value.width;
  const secondLLeft = bodyPxInfo.left;

  const [top, left] = (() => {
    if (computedDirection.value === "bl") return [firstBTop, secondLLeft];
    if (computedDirection.value === "br") return [firstBTop, secondRLeft];
    if (computedDirection.value === "tl") return [firstTTop, secondLLeft];
    if (computedDirection.value === "tr") return [firstTTop, secondRLeft];
    if (computedDirection.value === "rt") return [secondTTop, firstRLeft];
    if (computedDirection.value === "rb") return [secondBTop, firstRLeft];
    if (computedDirection.value === "lt") return [secondTTop, firstLLeft];
    if (computedDirection.value === "lb") return [secondBTop, firstLLeft];
    return [0, 0];
  })();

  return `${top}px auto auto ${left}px`;
});

const popupTranslate = computed(() => {
  const gap = getSpacingCss(props.gap) ?? "0";
  const [firstChar] = directionToTuple(computedDirection.value);
  if (firstChar === "t") return `translate(0, -${gap})`;
  if (firstChar === "b") return `translate(0, ${gap})`;
  if (firstChar === "l") return `translate(-${gap}, 0)`;
  if (firstChar === "r") return `translate(${gap}, 0)`;
  return "translate(0, 0)";
});
</script>
