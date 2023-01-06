<template>
  <button
    :class="[
      textButtonStyle[variant],
      textButtonSizeStyle[size],
      disabled && textButtonDisabledStyle,
      rounded && textButtonRoundStyle,
      expand && textButtonExpandStyle,
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <WizHStack
      align="center"
      justify="center"
      gap="xs"
      :reverse="iconPosition === 'right'"
    >
      <WizIcon v-if="icon" :icon="icon" :color="variantColor" size="xl2" />
      <slot />
    </WizHStack>
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
import { withDefaults, computed } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TextButton,
});

interface Props {
  variant?: "primary" | "sub";
  size?: "sm" | "md" | "lg";
  expand?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  icon?: TIcon;
  iconPosition?: "left" | "right";
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
  iconPosition: "left",
});

const emit = defineEmits<Emits>();

const onClick = () => props.disabled || emit("click");

const variantColor = computed(() => {
  if (props.variant === "primary") return "white.800";
  if (props.variant === "sub") return "green.800";
  return undefined;
});
</script>
