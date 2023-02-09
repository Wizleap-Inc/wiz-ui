<template>
  <button
    :class="[
      tinyButtonSizeStyle,
      selectable && active && tinyButtonSelectableStyle.active,
      selectable && !active && tinyButtonSelectableStyle.inactive,
      !selectable && active && tinyButtonNotSelectableStyle.active,
      !selectable && !active && tinyButtonNotSelectableStyle.inactive,
      rounded && tinyButtonRoundStyle,
    ]"
    :disabled="props.selectable"
    @click="onClick"
  >
    <WizHStack
      align="center"
      justify="center"
      gap="xs2"
      :reverse="iconPosition === 'right'"
    >
      <WizIcon v-if="icon" :icon="icon" size="xs" />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tinyButtonRoundStyle,
  tinyButtonSizeStyle,
  tinyButtonSelectableStyle,
  tinyButtonNotSelectableStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import { PropType } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TinyButton,
});

interface Emits {
  (e: "click"): void;
}

const props = defineProps({
  selectable: {
    type: Boolean,
    required: false,
    default: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: true,
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

const onClick = () => props.selectable || emit("click");
</script>
