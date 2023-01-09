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
import { computed, PropType } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TextButton,
});

interface Emits {
  (e: "click"): void;
}

const props = defineProps({
  variant: {
    type: String as PropType<"primary" | "sub">,
    required: false,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: true,
  },
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg">,
    required: false,
    default: "md",
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  iconPosition: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "left",
  },
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
