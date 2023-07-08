<template>
  <teleport to="body">
    <div
      :class="[
        zIndexStyle['base'],
        !isActuallyOpen && styles.hiddenStyle,
        backgroundStyle['white.800'],
        styles.containerStyle,
      ]"
      :style="{
        left: `${contentLeft}px`,
        height: `${modalHeight}px`,
      }"
      ref="modalRef"
    >
      <WizVStack>
        <div :class="styles.headerStyle">
          <WizHStack
            justify="between"
            :height="getSpacingCss('xl3')"
            align="center"
          >
            <WizText bold> {{ title }} </WizText>
            <WizHStack gap="md">
              <slot name="header" />
              <WizIconButton
                :icon="WizIClose"
                variant="transparent"
                @click="closeModal"
              />
            </WizHStack>
          </WizHStack>
        </div>
        <WizDivider color="gray.300" />
        <div :class="styles.contentStyle">
          <slot />
        </div>
      </WizVStack>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ComponentName, getSpacingCss } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/full-modal-view.css";
import {
  backgroundStyle,
  zIndexStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, watch } from "vue";

import {
  WizDivider,
  WizHStack,
  WizIClose,
  WizIconButton,
  WizText,
  WizVStack,
} from "@/components";

defineOptions({
  name: ComponentName.FullModalView,
});

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: true,
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
const contentLeft = document.documentElement.clientLeft;
const modalHeight = document.documentElement.scrollHeight;

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
            top: `${0}px`,
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
            top: `${0}px`,
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
