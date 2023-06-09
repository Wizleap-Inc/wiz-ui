<template>
  <div
    :class="[menuItemStyle, menuItemVariantStyle[componentStatus]]"
    :style="{ width: width }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="activate"
    @mouseup="inactivate"
    @mouseout="inactivate"
    @click="onClick"
  >
    <WizHStack align="center" justify="between">
      <div :class="fontSizeStyle[fontSize]">
        {{ label }}
      </div>
      <WizIcon size="xl2" :icon="WizIChevronRight" :color="iconColor" />
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  menuItemStyle,
  menuItemVariantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/menu.css";
import { fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, ref } from "vue";

import { WizIChevronRight } from "@/components/icons";

import { WizHStack, WizIcon } from "../";

interface Emit {
  (event: "click"): void;
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  clickable: {
    type: Boolean,
    required: false,
    default: true,
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "md",
  },
});

const emit = defineEmits<Emit>();

const isHover = ref(false);
const isPressed = ref(false);

const onMouseOver = () => {
  isHover.value = true;
};
const onMouseLeave = () => (isHover.value = false);
const onClick = () => props.clickable && emit("click");

const activate = () => (isPressed.value = true);
const inactivate = () => (isPressed.value = false);

const width = computed(() => props.width);
const iconColor = computed((): ColorKeys => {
  return props.clickable && (props.active || isHover.value)
    ? "green.800"
    : "gray.500";
});
const componentStatus = computed(() => {
  if (!props.clickable) return "disabled";
  if (props.active || isPressed.value) return "active";
  if (isHover.value) return "hover";
  return "default";
});
</script>
