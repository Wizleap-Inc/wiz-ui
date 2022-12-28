<template>
  <div
    :class="[dynamicClass, menuItemStyle]"
    :style="{ width: width }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @click="onClick"
  >
    <WizHStack align="center" justify="between">
      <div>{{ label }}</div>
      <WizIcon size="xl2" :icon="WizIChevronRight" :color="iconColor" />
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  menuItemStyle,
  menuItemHoverStyle,
  menuItemActiveStyle,
  menuItemDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/menu.css";
import { ref, computed, defineProps, defineEmits } from "vue";

import { WizIChevronRight } from "@/components/icons";

import { WizHStack, WizIcon } from "../";

interface Props {
  label: string;
  width?: string;
  active?: boolean;
  clickable?: boolean;
}

interface Emit {
  (event: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  clickable: true,
  width: "10rem",
});

const emit = defineEmits<Emit>();

const isHover = ref(false);
const isPressed = ref(false);

const onMouseOver = () => {
  isHover.value = true;
};
const onMouseLeave = () => (isHover.value = false);
const onClick = () => props.clickable && emit("click");

const onMouseDown = () => (isPressed.value = true);
const onMouseUp = () => (isPressed.value = false);

const width = computed(() => props.width);
const iconColor = computed((): ColorKeys => {
  return props.clickable && (props.active || isHover.value)
    ? "green.800"
    : "gray.500";
});
const dynamicClass = computed(() => {
  if (!props.clickable) return menuItemDisabledStyle;
  if (props.active || isPressed.value) return menuItemActiveStyle;
  if (isHover.value) return menuItemHoverStyle;
  return "";
});
</script>
