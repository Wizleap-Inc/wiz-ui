<template>
  <button
    :class="[
      toggleButtonStyle,
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
        size="xl2"
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
} from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import { ref } from "vue";

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
}

interface Emits {
  (event: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rounded: true,
});

const isActive = ref(false);

const emits = defineEmits<Emits>();

const onClick = () => {
  if (props.disabled) return;
  isActive.value = !isActive.value;
  emits("click");
};
</script>
