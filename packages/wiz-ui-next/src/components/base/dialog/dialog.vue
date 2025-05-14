<template>
  <teleport to="body">
    <div
      :class="[dialogStyle, visible && dialogVisibleStyle]"
      :style="{ zIndex: currentZIndex }"
    >
      <div :class="dialogMaskStyle" @click.self="close">
        <WizCard :max-width="maxWidth" p="xl" :title="title" :align="align">
          <template #mainHeaderArea>
            <slot v-if="!title" name="title" />
          </template>
          <template v-if="!hideClose" #subHeaderArea>
            <WizIconButton
              :icon="WizIClose"
              :aria-label="ARIA_LABELS.DIALOG.CLOSE"
              variant="transparent"
              @click="close"
            />
          </template>
          <slot />
          <template #footer>
            <slot name="footer" />
          </template>
        </WizCard>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {
  ARIA_LABELS,
  ComponentName,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  dialogBlockScrollStyle,
  dialogMaskStyle,
  dialogStyle,
  dialogVisibleStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import { computed, onUnmounted, PropType, watch } from "vue";

import { WizIconButton } from "@/components/base/buttons";
import { WizCard } from "@/components/base/card";
import { WizIClose } from "@/components/icons";
import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.Dialog,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
    default: "600px",
  },
  align: {
    type: String as PropType<"start" | "center" | "end">,
    required: false,
  },
  hideClose: {
    type: Boolean,
    required: false,
    default: false,
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
