<template>
  <teleport to="body">
    <div
      :class="[dialogStyle, visible && dialogVisibleStyle]"
      :style="{ zIndex: currentZIndex }"
    >
      <div :class="dialogMaskStyle" @click.self="close">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  dialogBlockScrollStyle,
  dialogMaskStyle,
  dialogStyle,
  dialogVisibleStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import { computed, onUnmounted, watch } from "vue";

import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.UnstyledDialog,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

interface Emit {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => (visible.value = false);

const { currentZIndex } = useZIndex(THEME.zIndex.dialog);

let scrollY = 0;

// スクロールロックを解除する関数を定義
const cleanupScrollLock = () => {
  document.body.classList.remove(dialogBlockScrollStyle);
  document.body.style.top = "";
  window.scrollTo(0, scrollY);
  scrollY = 0;
};

watch(
  () => visible.value,
  (value) => {
    if (value) {
      // スクロールバーが表示されている場合
      if (document.body.scrollHeight > window.innerHeight) {
        scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add(dialogBlockScrollStyle);
      }
    } else {
      cleanupScrollLock();
    }
  }
);

onUnmounted(() => {
  if (visible.value) {
    cleanupScrollLock();
  }
});
</script>
