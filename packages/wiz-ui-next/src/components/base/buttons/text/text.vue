<template>
  <button
    :type="type"
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
        :color="variantColor[variant]"
        :size="iconSize[size]"
      />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  textButtonDisabledStyle,
  textButtonExpandStyle,
  textButtonRoundStyle,
  textButtonSizeStyle,
  textButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import { PropType } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TextButton,
});

interface Emits {
  (e: "click"): void;
}

const props = defineProps({
  variant: {
    type: String as PropType<
      "primary" | "sub" | "danger" | "sub-danger" | "gray"
    >,
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
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    required: false,
  },
});

const emit = defineEmits<Emits>();

const onClick = () => props.disabled || emit("click");

const variantColor: Record<
  "primary" | "sub" | "danger" | "sub-danger" | "gray",
  ColorKeys
> = {
  primary: "white.800",
  sub: "green.800",
  danger: "white.800",
  "sub-danger": "red.800",
  gray: "white.800",
};

const iconSize: Record<"xs" | "sm" | "md" | "lg", FontSizeKeys> = {
  xs: "lg",
  sm: "xl",
  md: "xl2",
  lg: "xl3",
};
</script>
