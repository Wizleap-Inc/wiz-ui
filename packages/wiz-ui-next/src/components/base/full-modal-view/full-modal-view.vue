<template>
  <teleport to="body">
    <div
      :class="[
        zIndexStyle['base'],
        !isActuallyOpen && styles.hiddenStyle,
        bgColor && backgroundStyle[bgColor],
      ]"
      :style="{
        position: 'fixed',
        top: `${contentTop}px`,
        left: `${contentLeft}px`,
        width: `${anchorRef?.clientWidth}px`,
        height: `${modalHeight}px`,
      }"
      ref="modalRef"
    >
      <slot />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/full-modal-view.css";
import {
  backgroundStyle,
  zIndexStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, inject, onMounted, ref, watch } from "vue";

import { useClickOutside } from "@/hooks/use-click-outside";

import { FULL_MODAL_VIEW_KEY } from "./provider";
defineOptions({
  name: ComponentName.FullModalView,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  /**
   * モーダルの背景色を指定します。
   */
  bgColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  /**
   * モーダルの開閉アニメーションの時間を指定します。
   */
  duration: {
    type: Number,
    required: false,
    default: 200,
  },
});

interface Emit {
  (e: "close"): void;
}
const emit = defineEmits<Emit>();
const isActuallyOpen = ref(props.isOpen);
const closeModal = () => {
  emit("close");
};
const modalRef = ref<HTMLElement | undefined>(undefined);

const injected = inject(FULL_MODAL_VIEW_KEY);

if (!injected) {
  throw new Error(
    `${ComponentName.FullModalView}は${ComponentName.FullModalViewContainer}の中で使用する必要があります。`
  );
}

const { anchorRef } = injected;

const contentTop = ref(0);
const contentLeft = ref(0);
const modalHeight = ref(document.documentElement.scrollHeight); // - contentTop.value;

useClickOutside(modalRef, () => {
  closeModal();
});
watch(anchorRef, (anchor) => {
  const rect = anchor?.getBoundingClientRect();
  if (rect) contentTop.value = rect.top + rect.height;
  if (rect) contentLeft.value = rect.left;
});

// TODO: focus管理
onMounted(() => {
  modalRef.value?.focus();
  const updateModal = () => {
    const rect = anchorRef.value?.getBoundingClientRect();
    modalHeight.value = document.documentElement.scrollHeight;
    if (rect) {
      contentTop.value = rect.top + rect.height;
      contentLeft.value = rect.left;
    }
  };
  updateModal();
  window.addEventListener("scroll", updateModal);
  window.addEventListener("resize", updateModal);
  return () => {
    window.removeEventListener("scroll", updateModal);
    window.removeEventListener("resize", updateModal);
  };
});

// Animation + 開閉ロジック
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen === isActuallyOpen.value) {
      return;
    }
    if (isOpen) {
      isActuallyOpen.value = true;
      modalRef.value?.animate(
        [
          {
            top: `${window.innerHeight}px`,
          },
          {
            top: `${contentTop.value}px`,
          },
        ],
        {
          duration: props.duration,
          easing: "ease-in-out",
        }
      );
    } else {
      const animation = modalRef.value?.animate(
        [
          {
            top: `${contentTop.value}px`,
          },
          {
            top: `${window.innerHeight}px`,
          },
        ],
        {
          duration: props.duration,
          easing: "ease-in-out",
        }
      );
      if (animation)
        animation.onfinish = () => {
          isActuallyOpen.value = false;
        };
    }
  }
);
</script>
