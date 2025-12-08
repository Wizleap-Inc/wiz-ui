<template>
  <details
    :class="[accordionDetailsStyle, bgColor && backgroundStyle[bgColor]]"
    :style="{ width }"
    :open="isOpen || isAnimating"
  >
    <!-- align-betweenはテキストとアイコンの間隔のためのものなのでstartに変換する -->
    <summary
      :class="[
        accordionSummaryStyle,
        accordionSummaryAlignStyle[align === 'between' ? 'start' : align],
      ]"
      @click="onClick"
    >
      <WizHStack
        align="center"
        :width="align === 'between' ? '100%' : 'auto'"
        justify="between"
        :reverse="iconPosition === 'left'"
        gap="xs2"
        :class="[
          accordionMessageStyle,
          colorStyle[fontColor],
          bgColor && backgroundStyle[bgColor],
        ]"
      >
        <div :class="accordionSummaryTextStyle">
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          size="xl2"
          :icon="expandIcon"
          :color="iconColor || fontColor"
          :class="[
            accordionExpandIconStyle,
            isOpen && accordionRotateIconStyle,
          ]"
        />
      </WizHStack>
    </summary>
    <div ref="contentRef" :class="[accordionContentStyle]">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  accordionContentStyle,
  accordionDetailsStyle,
  accordionExpandIconStyle,
  accordionMessageStyle,
  accordionRotateIconStyle,
  accordionSummaryAlignStyle,
  accordionSummaryStyle,
  accordionSummaryTextStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, nextTick, ref } from "vue";

import { WizHStack, WizIcon } from "@/components";
import { WizIExpandMore, WizIExpandMoreBold } from "@/components/icons";

import {
  ANIMATION_CONFIGURATION,
  closingAnimationKeyframes,
  openingAnimationKeyframes,
} from "./animation-configuration";

const props = defineProps({
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
  align: {
    type: String as PropType<"start" | "center" | "end" | "between">,
    required: false,
    default: "center",
  },
  iconPosition: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "right",
  },
  iconWeight: {
    type: String as PropType<"normal" | "bold">,
    required: false,
    default: "normal",
  },
  iconColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
});

interface Emit {
  (e: "toggle"): void;
}
const emit = defineEmits<Emit>();

const contentRef = ref<HTMLElement | undefined>();
const isAnimating = ref(false);

const expandIcon = computed(() => {
  return props.iconWeight === "bold" ? WizIExpandMoreBold : WizIExpandMore;
});

const onClick = (event: MouseEvent) => {
  event.preventDefault();
  if (contentRef.value === undefined) return;
  if (isAnimating.value) return;

  isAnimating.value = true;
  const content = contentRef.value;
  if (props.isOpen) {
    const closingAnimation = content.animate(
      closingAnimationKeyframes(content),
      ANIMATION_CONFIGURATION
    );
    closingAnimation.onfinish = () => {
      isAnimating.value = false;
    };
  } else {
    nextTick(() => {
      content.style.maxHeight = content.scrollHeight + "px";
      const openingAnimation = content.animate(
        openingAnimationKeyframes(content),
        ANIMATION_CONFIGURATION
      );
      openingAnimation.onfinish = () => {
        isAnimating.value = false;
      };
    });
  }
  emit("toggle");
};
</script>
