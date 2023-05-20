<template>
  <WizVStack
    :class="[showMoreLessDetailsStyle, bgColor && backgroundStyle[bgColor]]"
    :style="{ width, height }"
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
    <div
      :class="[
        showMoreLessSummaryStyle,
        isHover && showMoreDefaultHoverBgColorStyle,
      ]"
      @click="onClick"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="[
          showMoreLessMessageStyle,
          isHover
            ? showMoreDefaultHoverBgColorStyle
            : bgColor && backgroundStyle[bgColor],
          colorStyle[fontColor],
        ]"
      >
        <div :class="isHover && showMoreLessDefaultHoverStyle">
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          size="xl2"
          :icon="WizIExpandMore"
          :color="isHover ? 'green.800' : fontColor"
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
  showMoreDefaultHoverBgColorStyle,
  showMoreLessDefaultHoverStyle,
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
  height: {
    type: String,
    required: false,
    default: "44px",
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
const isHover = ref(false);

const toggleHeight = computed(() => {
  const content = contentRef.value;
  return content?.scrollHeight + "px";
});

const onClick = (event: MouseEvent) => {
  emit("toggle");
  event.preventDefault();
};
</script>
