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
    <div>
      <div
        :class="messageBoxTitleStyle"
        :style="{ marginBottom: titleMarginBottom }"
      >
        {{ title }}
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName , THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  messageBoxStyle,
  messageBoxWidthStyle,
  messageBoxVariantStyle,
  messageBoxIconStyle,
  messageBoxIconFillStyle,
  messageBoxTitleStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
import { computed, PropType } from "vue";

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
  isTitleOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const computedWidth = computed(() => {
  return props.expand ? "expand" : "default";
});

const titleMarginBottom = props.isTitleOnly ? 0 : THEME.spacing.xs;
</script>
