<template>
  <WizVStack :width="width" :class="AccordionDetailsStyle[backgroundColor]">
    <div
      v-if="isOpen && !expandDown"
      ref="contentRef"
      :class="[AccordionContentStyle, ...computedPadding]"
    >
      <slot />
    </div>
    <div :class="AccordionSummaryStyle" @click="onClick">
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
          v-if="expandDown ? isOpen : !isOpen"
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
    </div>
    <div
      v-if="isOpen && expandDown"
      ref="contentRef"
      :class="[AccordionContentStyle, ...computedPadding]"
    >
      <slot />
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import { ColorKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  AccordionMessageVariantStyle,
  AccordionDetailsStyle,
  AccordionContentStyle,
  AccordionSummaryStyle,
  openSpin,
  closeSpin,
} from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  paddingTopStyle,
  paddingRightStyle,
  paddingBottomStyle,
  paddingLeftStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizIcon, WizVStack } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";

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
  expandDown: {
    type: Boolean,
    required: false,
    default: true,
  },
  p: { type: String as PropType<SpacingKeys>, required: false },
  pt: { type: String as PropType<SpacingKeys>, required: false },
  pr: { type: String as PropType<SpacingKeys>, required: false },
  pb: { type: String as PropType<SpacingKeys>, required: false },
  pl: { type: String as PropType<SpacingKeys>, required: false },
  px: { type: String as PropType<SpacingKeys>, required: false },
  py: { type: String as PropType<SpacingKeys>, required: false },
});

interface Emit {
  (e: "toggle"): void;
}
const emit = defineEmits<Emit>();

const canSpin = ref(false);

const iconColor = computed((): ColorKeys => {
  return props.backgroundColor === "gray" ? "green.800" : "gray.500";
});

const contentRef = ref<HTMLElement | undefined>();

const onClick = (event: MouseEvent) => {
  canSpin.value = true;
  emit("toggle");
  event.preventDefault();
};

const computedPadding = computed(() => [
  props.px && paddingXStyle[props.px],
  props.py && paddingYStyle[props.py],
  !props.px && !props.py && props.p && paddingStyle[props.p],
  props.pt && paddingTopStyle[props.pt],
  props.pr && paddingRightStyle[props.pr],
  props.pb && paddingBottomStyle[props.pb],
  props.pl && paddingLeftStyle[props.pl],
]);
</script>
