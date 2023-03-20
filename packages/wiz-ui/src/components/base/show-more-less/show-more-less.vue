<template>
  <WizVStack
    :class="accordionDetailsStyle[backgroundColor]"
    :style="{ width }"
    :open="isOpen || isAnimating"
  >
    <div
      ref="contentRef"
      :class="[accordionContentStyle]"
      :style="{
        maxHeight: isOpen ? toggleHeight : 0,
      }"
    >
      <slot />
    </div>
    <div :class="accordionSummaryStyle" @click="onClick">
      <WizHStack
        align="center"
        justify="between"
        gap="xs2"
        :class="[accordionMessageVariantStyle[backgroundColor]]"
      >
        <div>
          {{ isOpen ? closeMessage : openMessage }}
        </div>
        <WizIcon
          size="xl2"
          :icon="WizIExpandMore"
          :color="iconColor"
          :class="[
            accordionExpandIconStyle,
            isOpen && accordionRotateIconStyle,
          ]"
        />
      </WizHStack>
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  accordionMessageVariantStyle,
  accordionDetailsStyle,
  accordionContentStyle,
  accordionSummaryStyle,
  accordionExpandIconStyle,
  accordionRotateIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizVStack, WizIcon } from "@/components";
import { WizIExpandMore } from "@/components/icons";

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
});

interface Emit {
  (e: "toggle"): void;
}
const emit = defineEmits<Emit>();

const iconColor = computed((): ColorKeys => {
  return props.backgroundColor === "gray" ? "green.800" : "gray.500";
});

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
