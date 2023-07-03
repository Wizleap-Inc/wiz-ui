<template>
  <teleport to="body">
    <div
      :class="[zIndexStyle['popover'], !isActuallyOpen && styles.hiddenStyle]"
      :style="{
        position: 'fixed',
        top: `${contentTop}px`,
        width: `${anchorRef?.clientWidth}px`,
        height: `${modalHeight}px`,
        background: 'rgba(100, 100, 100, 0.8)',
        backdropFilter: 'blur(10px)',
      }"
      ref="modalRef"
    >
      <slot />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/full-modal-view.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { inject, onMounted, ref, watch } from "vue";

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
    `${ComponentName.FullModalView}は${ComponentName.FullModalView}の中で使用する必要があります。`
  );
}

const { anchorRef } = injected;

const contentTop = ref(0);
const modalHeight = ref(document.documentElement.scrollHeight); // - contentTop.value;

useClickOutside(modalRef, () => {
  closeModal();
});
watch(anchorRef, (anchor) => {
  const rect = anchor?.getBoundingClientRect();
  if (rect) contentTop.value = rect.top + rect.height;
});

// TODO: focus管理
onMounted(() => {
  modalRef.value?.focus();
  const handleScroll = () => {
    const rect = anchorRef.value?.getBoundingClientRect();
    modalHeight.value = document.documentElement.scrollHeight;
    if (rect) {
      contentTop.value = rect.top + rect.height;
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
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
          duration: 200,
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
          duration: 200,
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
