<template>
  <WizVStack :width="width" :class="AccordionDetailsStyle[backgroundColor]">
    <slot
      ref="contentRef"
      :class="AccordionContentStyle"
      v-if="isOpen && !expandDown"
    />
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
    <slot
      ref="contentRef"
      :class="AccordionContentStyle"
      v-if="isOpen && expandDown"
    />
  </WizVStack>
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
</script>
