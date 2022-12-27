<template>
  <div
    :class="[
      messageBoxStyle,
      messageBoxWidthStyle[computedWidth],
      messageBoxVariantStyle[variant],
    ]"
  >
    <component v-if="icon" :is="icon" :class="messageBoxIconStyle" />
    <div>
      <div :class="messageBoxTitleStyle">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  messageBoxStyle,
  messageBoxWidthStyle,
  messageBoxVariantStyle,
  messageBoxIconStyle,
  messageBoxTitleStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
import { computed } from "vue";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.MessageBox,
});
interface Props {
  variant?: "information" | "caution" | "warning";
  title: string;
  icon?: TIcon;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "information",
  title: "",
  expand: false,
});

const computedWidth = computed(() => {
  return props.expand ? "expand" : "default";
});
</script>
