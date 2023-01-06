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
      gap="xs2"
      :reverse="iconPosition === 'right'"
    >
      <WizIcon
        v-if="icon"
        :icon="icon"
        :color="variantColor"
        :size="iconSize"
      />
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
  size?: "xs" | "sm" | "md" | "lg";
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

const iconSize = computed(() => {
  if (props.size === "xs") return "lg";
  if (props.size === "sm") return "xl";
  if (props.size === "md") return "xl2";
  if (props.size === "lg") return "xl3";
  return undefined;
});
</script>
