<template>
  <div
    :class="[
      messageBoxStyle,
      messageBoxWidthStyle[computedWidth],
      messageBoxVariantStyle[variant],
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :class="[messageBoxIconStyle, messageBoxIconFillStyle[variant]]"
    />
    <WizVStack gap="xs">
      <div :class="messageBoxTitleStyle">{{ title }}</div>
      <div v-if="hasDefaultSlot" :class="messageBoxBodyStyle">
        <slot />
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  messageBoxStyle,
  messageBoxWidthStyle,
  messageBoxVariantStyle,
  messageBoxIconStyle,
  messageBoxIconFillStyle,
  messageBoxTitleStyle,
  messageBoxBodyStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
import { computed, PropType, useSlots } from "vue";

import { WizVStack } from "@/components";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.MessageBox,
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  variant: {
    type: String as PropType<"information" | "caution" | "warning">,
    required: false,
    default: "information",
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const computedWidth = computed(() => {
  if (props.expand) return "expand";
  return "default";
});

const slots = useSlots();
const hasDefaultSlot = slots.default ? !!slots.default() : false;
</script>
