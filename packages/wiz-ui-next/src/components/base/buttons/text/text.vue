<template>
  <button
    :class="[
      textButtonStyle[variant],
      textButtonSizeStyle[size],
      disabled && textButtonDisabledStyle,
      rounded && textButtonRoundStyle,
      expand && textButtonExpandStyle,
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textButtonStyle,
  textButtonDisabledStyle,
  textButtonRoundStyle,
  textButtonExpandStyle,
  textButtonSizeStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import { withDefaults } from "vue";

defineOptions({
  name: ComponentName.TextButton,
});

interface Props {
  variant?: "primary" | "sub";
  size?: "sm" | "md" | "lg";
  expand?: boolean;
  disabled?: boolean;
  rounded?: boolean;
}

interface Emits {
  (e: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  rounded: true,
  expand: false,
  size: "md",
});

const emit = defineEmits<Emits>();

const onClick = () => props.disabled || emit("click");
</script>
