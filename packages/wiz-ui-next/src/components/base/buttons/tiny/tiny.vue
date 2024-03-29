<template>
  <button
    :type="type"
    :class="[
      tinyButtonBaseStyle,
      tinyButtonSizeStyle,
      tinyButtonVaraiantStyle[tinyButtonState],
      clickable && (isHover || hover) && tinyButtonHoverStyle,
      !p && !py && paddingYStyle['xs2'],
      !p && !px && paddingXStyle['sm'],
      p && paddingStyle[p],
      px && paddingXStyle[px],
      py && paddingYStyle[py],
    ]"
    :disabled="!clickable"
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
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  tinyButtonBaseStyle,
  tinyButtonHoverStyle,
  tinyButtonSizeStyle,
  tinyButtonVaraiantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, ref } from "vue";

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
  p: { type: String as PropType<SpacingKeys>, required: false },
  px: { type: String as PropType<SpacingKeys>, required: false },
  py: { type: String as PropType<SpacingKeys>, required: false },
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

const onClick = () => props.clickable && emit("click");
const tinyButtonState = computed(() => {
  const selectable = props.clickable ? "clickable" : "unclickable";
  const active = props.active ? "active" : "inactive";
  return `${selectable}+${active}` as const;
});
</script>
