<template>
  <div
    :class="[
      menuItemStyle,
      menuItemVariantStyle[componentStatus],
      expand && menuItemExpand,
    ]"
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

      <WizHStack align="center" gap="xs">
        <div v-if="tagLabel" :class="menuItemTagStyle">
          <WizTag
            :label="tagLabel"
            :icon="tagIcon"
            :variant="tagVariant"
            :fontSize="tagFontSize"
            fontWeight="bold"
          />
        </div>
        <WizIcon size="xl2" :icon="WizIChevronRight" :color="iconColor" />
      </WizHStack>
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  menuItemStyle,
  menuItemVariantStyle,
  menuItemExpand,
  menuItemTagStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/menu.css";
import { fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, ref } from "vue";

import { TIcon, WizIChevronRight } from "@/components/icons";

import { WizHStack, WizIcon, WizTag } from "../";
import { TagVariant } from "../tag/types";

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
  expand: {
    type: Boolean,
    required: false,
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "md",
  },
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
  tagLabel: {
    type: String,
    required: false,
    default: "",
  },
  tagIcon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  tagVariant: {
    type: String as PropType<TagVariant>,
    required: false,
    default: "info",
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

const componentStatus = computed(() => {
  if (!props.clickable) return "disabled";
  if (props.selected) return "selected";
  if (props.active || isPressed.value) return "active";
  if (isHover.value) return "hover";
  return "default";
});

const tagFontSize = computed(() => {
  if (props.fontSize === "xl5" || props.fontSize === "xl6") return "md";
  return "xs";
});

const iconColor = computed(() => {
  if (!props.clickable) return "gray.500";
  if (props.active || isHover.value) return "green.800";
  return "gray.500";
});
</script>
