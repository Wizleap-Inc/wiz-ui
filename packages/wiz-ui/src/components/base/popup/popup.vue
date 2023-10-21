<template>
  <MountingPortal mountTo="body" append>
    <div
      :class="[
        popupStyle,
        shadow && popupShadowStyle,
        zIndexStyle[layer],
        !isActuallyOpen && popupHiddenStyle,
        isFixed && popupFixedStyle,
      ]"
      :style="{
        inset,
        transform: `${popupTranslate} translateZ(0)`,
      }"
      ref="popupRef"
      @mouseleave="mouseLeave"
    >
      <slot />
    </div>
  </MountingPortal>
</template>

<script setup lang="ts">
import {
  ComponentName,
  getSpacingCss,
  SpacingKeys,
  ZIndexKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  popupFixedStyle,
  popupHiddenStyle,
  popupShadowStyle,
  popupStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { MountingPortal } from "portal-vue";
import {
  computed,
  inject,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";

import { useClickOutside } from "@/hooks/use-click-outside";
import { useScroll } from "@/hooks/use-scroll";

import { POPUP_KEY } from "./provider";

type Direction =
  | "tl"
  | "tr"
  | "tc"
  | "bl"
  | "br"
  | "bc"
  | "rt"
  | "rb"
  | "rc"
  | "lt"
  | "lb"
  | "lc";
type DirectionChar = Direction extends `${infer X}${infer Y}` ? X | Y : never;

interface Emits {
  (event: "onClose", isOpen: boolean): void;
  (event: "onTurn", direction: Direction): void;
  (event: "mouseLeave", e: MouseEvent): void;
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
    type: String as PropType<Exclude<ZIndexKeys, "dialog">>,
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
  shadow: {
    type: Boolean,
    required: false,
    default: true,
  },
  animation: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 配置方向を固定するかどうかを設定します。
   *  - true: 配置方向を固定します。
   *  - false: 回り込みロジックが適用されます。
   */
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<Emits>();

const isActuallyOpen = ref(props.isOpen);
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

// safariでアニメーションを有効にするために必要
onMounted(() => {
  if (!popupRef.value) return;
  popupRef.value.style.animationName = "fade";
});

const togglePopup = () => {
  if (!props.animation) return (isActuallyOpen.value = props.isOpen);
  if (!popupRef.value) return;
  if (props.isOpen) {
    isActuallyOpen.value = props.isOpen;
    popupRef.value.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease-in-out",
    });
  } else {
    const animation = popupRef.value.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      easing: "ease-in-out",
    });
    animation.onfinish = () => {
      isActuallyOpen.value = props.isOpen;
    };
  }
};

const existsFixedOrStickyParent = (
  el: HTMLElement | null
): HTMLElement | null => {
  if (!el) return null;
  const position = window.getComputedStyle(el).position;
  if (position === "fixed" || position === "sticky") return el;
  return existsFixedOrStickyParent(el.parentElement);
};

let removeScrollHandler: (() => void) | null = null;
const onChangeIsOpen = (newValue: boolean) => {
  if (newValue) {
    togglePopup();
    nextTick(() => {
      removeScrollHandler = useScroll(updateBodyPxInfo, containerRef.value);
      updateBodyPxInfo();
      // vue2の場合、display: noneを解除した後にoffsetWidth等が取れるまでほんの少しだけ時間がかかる
      setTimeout(() => {
        popupSize.width = popupRef.value?.offsetWidth ?? 0;
        popupSize.height = popupRef.value?.offsetHeight ?? 0;
      }, 1);
    });
  } else {
    togglePopup();
    if (removeScrollHandler) removeScrollHandler();
    removeScrollHandler = null;
  }
};
watch(() => props.isOpen, onChangeIsOpen);
onMounted(() => onChangeIsOpen(props.isOpen));

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
    if (
      props.direction === "rt" ||
      props.direction === "rb" ||
      props.direction === "rc"
    ) {
      return bodyPxInfo.right;
    }
    if (
      props.direction === "lt" ||
      props.direction === "lb" ||
      props.direction === "lc"
    ) {
      return bodyPxInfo.left - popupSize.width;
    }
    if (props.direction === "tc" || props.direction === "bc") {
      return bodyPxInfo.left - (popupSize.width - bodyPxInfo.width) / 2;
    }
    return 0;
  })();

  const popupTop = (() => {
    if (
      props.direction === "tl" ||
      props.direction === "tr" ||
      props.direction === "tc"
    ) {
      return bodyPxInfo.top - popupSize.height;
    }
    if (
      props.direction === "bl" ||
      props.direction === "br" ||
      props.direction === "bc"
    ) {
      return bodyPxInfo.bottom;
    }
    if (props.direction === "rt" || props.direction === "lt") {
      return bodyPxInfo.top;
    }
    if (props.direction === "rb" || props.direction === "lb") {
      return bodyPxInfo.top - (popupSize.height - bodyPxInfo.height);
    }
    if (props.direction === "rc" || props.direction === "lc") {
      return bodyPxInfo.top - (popupSize.height - bodyPxInfo.height) / 2;
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
  return {
    top: top,
    right: clientWidth - right,
    bottom: clientHeight - bottom,
    left: left,
  };
});

const isDirectionChar = (char: string): char is DirectionChar => {
  return ["t", "b", "l", "r", "c"].includes(char);
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
  if (props.isDirectionFixed) return props.direction;
  const chars = directionToTuple(props.direction);
  const { top, left, bottom, right } = spaceBetweenPopupAndWindow.value;

  if (chars[1] === "c") {
    if (chars[0] === "t" || chars[0] === "b") {
      if (top < 0 || bottom < 0) chars[0] = convertDirection(chars[0]);
      if (left < 0) chars[1] = "l";
      if (right < 0) chars[1] = "r";
    } else if (chars[0] === "l" || chars[0] === "r") {
      if (left < 0 || right < 0) chars[0] = convertDirection(chars[0]);
      if (top < 0) chars[1] = "t";
      if (bottom < 0) chars[1] = "b";
    }
    return chars.join("") as Direction;
  }

  if (chars[0] === "t" || chars[0] === "b") {
    if ((chars[0] === "t" && top < 0) || (chars[0] === "b" && bottom < 0)) {
      chars[0] = convertDirection(chars[0]);
    }
    if ((chars[1] === "l" && right < 0) || (chars[1] === "r" && left < 0)) {
      chars[1] = convertDirection(chars[1]);
    }
  } else if (chars[0] === "l" || chars[0] === "r") {
    if ((chars[1] === "t" && bottom < 0) || (chars[1] === "b" && top < 0)) {
      chars[1] = convertDirection(chars[1]);
    }
    if ((chars[0] === "l" && left < 0) || (chars[0] === "r" && right < 0)) {
      chars[0] = convertDirection(chars[0]);
    }
  }

  return chars.join("") as Direction;
});
watch(
  () => computedDirection.value,
  (newVal) => {
    emit("onTurn", newVal);
  }
);

const isFixed = computed(() => {
  return existsFixedOrStickyParent(containerRef.value || null) ? true : false;
});

const inset = computed(() => {
  const { scrollX, scrollY } = isFixed.value
    ? { scrollX: 0, scrollY: 0 }
    : window;
  const firstBTop = bodyPxInfo.top + scrollY + bodyPxInfo.height;
  const secondBTop =
    bodyPxInfo.top + scrollY - popupRect.value.height + bodyPxInfo.height;
  const firstTTop = bodyPxInfo.top + scrollY - popupRect.value.height;
  const secondTTop = bodyPxInfo.top + scrollY;
  const firstRLeft = bodyPxInfo.left + scrollX + bodyPxInfo.width;
  const secondRLeft =
    bodyPxInfo.left + scrollX - popupRect.value.width + bodyPxInfo.width;
  const firstLLeft = bodyPxInfo.left + scrollX - popupRect.value.width;
  const secondLLeft = bodyPxInfo.left + scrollX;
  const cLeft =
    bodyPxInfo.left + scrollX + (bodyPxInfo.width - popupRect.value.width) / 2;
  const cTop =
    bodyPxInfo.top + scrollY + (bodyPxInfo.height - popupRect.value.height) / 2;

  const [top, left] = (() => {
    if (computedDirection.value === "bl") return [firstBTop, secondLLeft];
    if (computedDirection.value === "br") return [firstBTop, secondRLeft];
    if (computedDirection.value === "bc") return [firstBTop, cLeft];
    if (computedDirection.value === "tl") return [firstTTop, secondLLeft];
    if (computedDirection.value === "tr") return [firstTTop, secondRLeft];
    if (computedDirection.value === "tc") return [firstTTop, cLeft];
    if (computedDirection.value === "rt") return [secondTTop, firstRLeft];
    if (computedDirection.value === "rb") return [secondBTop, firstRLeft];
    if (computedDirection.value === "rc") return [cTop, firstRLeft];
    if (computedDirection.value === "lt") return [secondTTop, firstLLeft];
    if (computedDirection.value === "lb") return [secondBTop, firstLLeft];
    if (computedDirection.value === "lc") return [cTop, firstLLeft];
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

const mouseLeave = (e: MouseEvent) => emit("mouseLeave", e);
</script>
