<template>
  <details
    :width="width"
    :class="AccordionDetailsStyle[backgroundColor]"
    :open="isOpen || isAnimating"
  >
    <summary :class="AccordionSummaryStyle" @click="onClick">
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="[AccordionMessageVariantStyle[backgroundColor]]"
      >
        <div>
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          v-if="!isOpen"
          size="xl2"
          :icon="WizIExpandMore"
          :color="iconColor"
          :class="[canSpin && openSpin]"
        />
        <WizIcon
          v-else
          size="xl2"
          :icon="WizIExpandLess"
          :color="iconColor"
          :class="[canSpin && closeSpin]"
        />
      </WizHStack>
    </summary>
    <div ref="contentRef" :class="AccordionContentStyle">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  AccordionMessageVariantStyle,
  AccordionDetailsStyle,
  AccordionContentStyle,
  AccordionSummaryStyle,
  openSpin,
  closeSpin,
} from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizIcon } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";

import {
  animationConfiguration,
  closingAnimationKeyframes,
  openingAnimationKeyframes,
} from "./animation-configuration";

const props = defineProps({
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
  backgroundColor: {
    type: String as PropType<"gray" | "white">,
    required: false,
    default: "white",
  },
  width: {
    type: String,
    required: false,
    default: "20rem",
  },
});

const isOpen = ref(false);

const isAnimating = ref(false);

const canSpin = ref(false);

const iconColor = computed((): ColorKeys => {
  return props.backgroundColor === "gray" ? "green.800" : "gray.500";
});

const contentRef = ref();

const onClick = (event: MouseEvent) => {
  canSpin.value = true;
  event.preventDefault();
  const content = contentRef.value;
  if (isAnimating.value) return;
  if (isOpen.value) {
    isOpen.value = false;
    isAnimating.value = true;
    const closingAnimation = content.animate(
      closingAnimationKeyframes(content),
      animationConfiguration
    );
    closingAnimation.onfinish = () => {
      isAnimating.value = false;
    };
  } else {
    isOpen.value = true;
    isAnimating.value = true;
    const openingAnimation = content.animate(
      openingAnimationKeyframes(content),
      animationConfiguration
    );
    openingAnimation.onfinish = () => {
      isAnimating.value = false;
    };
  }
};
</script>
