<template>
  <teleport to="body">
    <div
      ref="modalRef"
      :class="[
        zIndexStyle['base'],
        !isActuallyOpen && styles.hiddenStyle,
        styles.containerStyle,
      ]"
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
                :aria-label="ARIA_LABELS.FULL_MODAL_VIEW.CLOSE"
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
import {
  ARIA_LABELS,
  ComponentName,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/full-modal-view.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
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
          duration: 200,
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
