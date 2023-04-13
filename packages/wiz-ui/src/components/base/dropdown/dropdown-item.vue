<template>
  <div
    :class="styles.dropdownItemStyle"
    @click="onClick"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
  >
    <WizHStack align="center">
      <slot />
      <WizIcon v-if="icon" size="md" :icon="icon" :color="computedColor" />
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import { computed, PropType, ref } from "vue";

import { WizIcon, WizHStack } from "@/components";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.DropdownItem,
});

defineProps({
  icon: {
    type: Object as PropType<TIcon>,
  },
});
interface Emit {
  (event: "click"): void;
}

const emit = defineEmits<Emit>();

const onClick = () => emit("click");

const isHover = ref(false);
const onMouseover = () => (isHover.value = true);
const onMouseout = () => (isHover.value = false);

const isPressed = ref(false);
const onMousedown = () => (isPressed.value = true);
const onMouseup = () => (isPressed.value = false);

const computedColor = computed(() => {
  if (isPressed.value) {
    return "white.800";
  }
  if (isHover.value) {
    return "green.800";
  }
  return undefined;
});
</script>
