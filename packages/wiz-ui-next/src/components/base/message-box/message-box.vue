<template>
  <div
    :class="[
      styles.messageBoxStyle,
      styles.messageBoxWidthStyle[computedWidth],
      styles.messageBoxVariantStyle[variant],
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :class="[
        styles.messageBoxIconStyle,
        styles.messageBoxIconFillStyle[variant],
      ]"
    />
    <div>
      <div :class="styles.messageBoxTitleStyle">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
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
});

const computedWidth = computed(() => {
  return props.expand ? "expand" : "default";
});
</script>
