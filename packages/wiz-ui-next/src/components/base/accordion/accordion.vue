<template>
  <details
    :class="[accordionDetailsStyle, bgColor && backgroundStyle[bgColor]]"
    :style="{ width }"
    :open="isOpen || isAnimating"
  >
    <summary :class="accordionSummaryStyle" @click="onClick">
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="[
          accordionMessageStyle,
          colorStyle[fontColor],
          bgColor && backgroundStyle[bgColor],
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
  accordionMessageStyle,
  accordionDetailsStyle,
  accordionContentStyle,
  accordionSummaryStyle,
  accordionExpandIconStyle,
  accordionRotateIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, PropType } from "vue";

import { WizHStack, WizIcon } from "@/components";
import { WizIExpandMore } from "@/components/icons";

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
});

interface Emit {
  (e: "toggle"): void;
}
const emit = defineEmits<Emit>();

const contentRef = ref<HTMLElement | undefined>();
const isAnimating = ref(false);

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
    const openingAnimation = content.animate(
      openingAnimationKeyframes(content),
      ANIMATION_CONFIGURATION
    );
    openingAnimation.onfinish = () => {
      isAnimating.value = false;
    };
  }
  emit("toggle");
};
</script>
