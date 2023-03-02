<template>
  <teleport to="body">
    <div
      :class="[popupStyle, zIndexStyle[layer], !isOpen && popupHiddenStyle]"
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
import {
  popupStyle,
  popupHiddenStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import {
  computed,
  watch,
  inject,
  PropType,
  ref,
  reactive,
  nextTick,
} from "vue";

import { useClickOutside } from "@/hooks/use-click-outside";

import { POPUP_KEY } from "./provider";

type Direction = "tl" | "tr" | "bl" | "br" | "rt" | "rb" | "lt" | "lb";
type DirectionChar = Direction extends `${infer X}${infer Y}` ? X | Y : never;

interface Emits {
  (event: "onClose", isOpen: boolean): void;
}

defineOptions({
  name: ComponentName.Popup,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  closeOnBlur: {
    type: Boolean,
    required: false,
    default: true,
  },
  layer: {
    type: String as PropType<Exclude<ZIndexKeys, "base" | "dialog">>,
    required: false,
    default: "popover",
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

const emit = defineEmits<Emits>();

const popupRef = ref<HTMLElement | undefined>();
const popupSize = reactive({
  width: 0,
  height: 0,
});

const injected = inject(POPUP_KEY);

if (!injected) {
  throw new Error(
    `${ComponentName.Popup}は${ComponentName.PopupContainer}の中で使用する必要があります。`
  );
}

const { bodyPxInfo, updateBodyPxInfo, containerRef } = injected;

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        popupSize.width = popupRef.value?.offsetWidth ?? 0;
        popupSize.height = popupRef.value?.offsetHeight ?? 0;
        updateBodyPxInfo();
      });
    }
  }
);

// popup-containerの外をクリックしたときにハンドラ発火
// クリックした対象がpopup以外で、かつcloseOnBlurがtrueのときはpopupを閉じる
useClickOutside(containerRef, (e) => {
  if (!popupRef.value?.contains(e.target as Node) && props.closeOnBlur) {
    emit("onClose", false);
  }
});

const observer = new ResizeObserver(updateBodyPxInfo);
observer.observe(document.body);

const popupRect = computed(() => {
  const popupLeft = (() => {
    if (props.direction === "tl" || props.direction === "bl") {
      return bodyPxInfo.left;
    }
    if (props.direction === "tr" || props.direction === "br") {
      return bodyPxInfo.right - popupSize.width;
    }
    if (props.direction === "rt" || props.direction === "rb") {
      return bodyPxInfo.right;
    }
    if (props.direction === "lt" || props.direction === "lb") {
      return bodyPxInfo.left - popupSize.width;
    }
    return 0;
  })();

  const popupTop = (() => {
    if (props.direction === "tl" || props.direction === "tr") {
      return bodyPxInfo.top;
    }
    if (props.direction === "bl" || props.direction === "br") {
      return bodyPxInfo.bottom - popupSize.height;
    }
    if (props.direction === "rt" || props.direction === "lt") {
      return bodyPxInfo.top - popupSize.height;
    }
    if (props.direction === "rb" || props.direction === "lb") {
      return bodyPxInfo.bottom;
    }
    return 0;
  })();

  return {
    width: popupSize.width,
    height: popupSize.height,
    left: popupLeft,
    top: popupTop,
    right: popupLeft + popupSize.width,
    bottom: popupTop + popupSize.height,
  };
});

const spaceBetweenPopupAndWindow = computed(() => {
  const { top, right, bottom, left } = popupRect.value;
  const { clientHeight, clientWidth } = document.documentElement;
  if (props.direction === "bl") {
    return { x: clientWidth - right, y: clientHeight - bottom };
  }
  if (props.direction === "br") {
    return { x: left, y: clientHeight - bottom };
  }
  if (props.direction === "tl") {
    return { x: clientWidth - right, y: top };
  }
  if (props.direction === "tr") {
    return { x: left, y: top };
  }
  if (props.direction === "rt") {
    return { x: clientWidth - right, y: clientHeight - bottom };
  }
  if (props.direction === "rb") {
    return { x: clientWidth - right, y: top };
  }
  if (props.direction === "lt") {
    return { x: left, y: clientHeight - bottom };
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
