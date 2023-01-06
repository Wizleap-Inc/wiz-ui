<template>
  <button
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
    <WizHStack align="center" gap="xs">
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
  toggleButtonStyle,
  toggleButtonActiveStyle,
  toggleButtonDisabledStyle,
  toggleButtonRoundedStyle,
  toggleButtonSizeStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import { ref, computed } from "vue";

import WizIcon from "@/components/base/icon/icon.vue";
import WizHStack from "@/components/base/stack/h-stack.vue";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.ToggleButton,
});

interface Props {
  inActiveIcon: TIcon;
  activeIcon: TIcon;
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
}

interface Emits {
  (event: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  iconPosition: "left",
  disabled: false,
  rounded: true,
  size: "md",
});

const isActive = ref(false);

const emits = defineEmits<Emits>();

const onClick = () => {
  if (props.disabled) return;
  isActive.value = !isActive.value;
  emits("click");
};

const iconSize = computed(() => {
  if (props.size === "sm") return "xl";
  if (props.size === "md") return "xl2";
  if (props.size === "lg") return "xl3";
  return undefined;
});
</script>
