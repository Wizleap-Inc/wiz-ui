<template>
  <button
    :class="[
      iconButtonStyle[variant],
      disabled && iconButtonDisabledStyle,
      fontSizeStyle[getRelativeFontSize(size, 3)],
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <component :is="icon" :class="iconButtonSVGStyle[variant]" />
  </button>
</template>

<script setup lang="ts">
import {
  ComponentName,
  getRelativeFontSize,
} from "@wizleap-inc/wiz-ui-constants";
import {
  iconButtonSVGStyle,
  iconButtonStyle,
  iconButtonDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/icon-button.css";
import { fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.IconButton,
});

interface Emits {
  (event: "click"): void;
}

const props = defineProps({
  icon: {
    type: Object as PropType<TIcon>,
    required: true,
  },
  variant: {
    type: String as PropType<"primary" | "sub" | "transparent" | "link">,
    required: false,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg" | "xl">,
    required: false,
    default: "md",
  },
});

const emits = defineEmits<Emits>();

const onClick = () => props.disabled || emits("click");
</script>
