<template>
  <WizVStack
    :class="[showMoreLessDetailsStyle, bgColor && backgroundStyle[bgColor]]"
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
    <div :class="showMoreLessSummaryStyle" @click="onClick">
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="[
          showMoreLessMessageStyle,
          bgColor && backgroundStyle[bgColor],
          colorStyle[fontColor],
        ]"
      >
        <div>
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          size="xl2"
          :icon="WizIExpandMore"
          :color="fontColor"
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
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  showMoreLessMessageStyle,
  showMoreLessDetailsStyle,
  showMoreLessContentStyle,
  showMoreLessSummaryStyle,
  showMoreLessExpandIconStyle,
  showMoreLessRotateIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizVStack, WizIcon } from "@/components";
import { WizIExpandMore } from "@/components/icons";

defineProps({
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
  bgColor: {
    type: String as PropType<ColorKeys | undefined>,
    required: false,
  },
  fontColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.600",
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
