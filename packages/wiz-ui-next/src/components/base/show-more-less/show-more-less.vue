<template>
  <WizVStack
    :class="[showMoreLessDetailsStyle]"
    :style="{ width }"
    :open="isOpen || isAnimating"
  >
    <div
      ref="contentRef"
      :class="[showMoreLessContentStyle]"
      :style="{
        maxHeight: isOpen ? toggleHeight : 0,
      }"
    >
      <slot />
    </div>
    <div :class="showMoreLessSummaryStyle[variant]" @click="onClick">
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :height="variant === 'mobile' ? '2.75rem' : '1.375rem'"
        :class="[showMoreLessMessageStyle]"
      >
        <div>
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          size="xl2"
          :icon="WizIExpandMore"
          color="inherit"
          :class="[
            showMoreLessExpandIconStyle,
            isOpen && showMoreLessRotateIconStyle,
          ]"
        />
      </WizHStack>
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import {
  showMoreLessContentStyle,
  showMoreLessDetailsStyle,
  showMoreLessExpandIconStyle,
  showMoreLessMessageStyle,
  showMoreLessRotateIconStyle,
  showMoreLessSummaryStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import { PropType, computed, ref } from "vue";

import { WizHStack, WizIcon, WizVStack } from "@/components";
import { WizIExpandMore } from "@/components/icons";

defineProps({
  variant: {
    type: String as PropType<"pc" | "mobile">,
    required: false,
    default: "pc",
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  openMessage: {
    type: String,
    required: false,
    default: "もっと見る",
  },
  closeMessage: {
    type: String,
    required: false,
    default: "閉じる",
  },
  width: {
    type: String,
    required: false,
    default: "20rem",
  },
});

interface Emit {
  (e: "toggle"): void;
}
const emit = defineEmits<Emit>();

const contentRef = ref<HTMLElement | undefined>();
const isAnimating = ref(false);

const toggleHeight = computed(() => {
  const content = contentRef.value;
  return content?.scrollHeight + "px";
});

const onClick = (event: MouseEvent) => {
  emit("toggle");
  event.preventDefault();
};
</script>
