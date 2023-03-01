<template>
  <button
    :class="[
      tinyButtonBaseStyle,
      tinyButtonSizeStyle,
      tinyButtonVaraiantStyle[tinyButtonState],
      clickable && (isHover || hover) && tinyButtonHoverStyle,
    ]"
    :disabled="!props.clickable"
    @click="onClick"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <WizHStack
      align="center"
      justify="center"
      gap="xs2"
      :reverse="iconPosition === 'right'"
    >
      <WizIcon v-if="icon" :icon="icon" color="white.800" size="xs" />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tinyButtonBaseStyle,
  tinyButtonHoverStyle,
  tinyButtonSizeStyle,
  tinyButtonVaraiantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import { computed, PropType, ref } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TinyButton,
});

interface Emits {
  (e: "click"): void;
}

const isHover = ref(false);

const props = defineProps({
  clickable: {
    type: Boolean,
    required: false,
    default: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  hover: {
    type: Boolean,
    required: false,
    default: false,
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

const onClick = () => props.clickable && emit("click");
const tinyButtonState = computed(() => {
  const selectable = props.clickable ? "clickable" : "unclickable";
  const active = props.active ? "active" : "inactive";
  return `${selectable}+${active}` as const;
});
</script>
