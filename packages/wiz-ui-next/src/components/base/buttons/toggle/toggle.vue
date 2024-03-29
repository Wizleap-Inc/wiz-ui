<template>
  <button
    :type="type"
    :class="[
      toggleButtonStyle,
      toggleButtonSizeStyle[size],
      isActive && toggleButtonActiveStyle,
      disabled && toggleButtonDisabledStyle,
      rounded && toggleButtonRoundedStyle,
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <WizHStack align="center" gap="xs2">
      <WizIcon
        :icon="isActive ? activeIcon : inActiveIcon"
        color="green.800"
        :size="iconSize"
      />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  toggleButtonActiveStyle,
  toggleButtonDisabledStyle,
  toggleButtonRoundedStyle,
  toggleButtonSizeStyle,
  toggleButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import { PropType, computed } from "vue";

import WizIcon from "@/components/base/icon/icon.vue";
import WizHStack from "@/components/base/stack/h-stack.vue";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.ToggleButton,
});

interface Emits {
  (event: "update:modelValue", value: boolean): void;
}

const props = defineProps({
  inActiveIcon: {
    type: Object as PropType<TIcon>,
    required: true,
  },
  activeIcon: {
    type: Object as PropType<TIcon>,
    required: true,
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
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    required: false,
    default: "md",
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    required: false,
  },
});

const emits = defineEmits<Emits>();

const isActive = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const onClick = () => {
  if (props.disabled) return;
  isActive.value = !isActive.value;
};

const iconSize = computed(() => {
  if (props.size === "sm") return "xl";
  if (props.size === "md") return "xl2";
  if (props.size === "lg") return "xl3";
  return undefined;
});
</script>
