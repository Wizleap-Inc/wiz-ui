<template>
  <div :class="badgeContainerStyle">
    <slot />
    <div
      v-if="!hidden"
      :class="[
        badgeStyle,
        label && badgeSizeStyle[size],
        colorStyle[color],
        backgroundStyle[bgColor],
        topStyle[offset],
        rightStyle[offset],
      ]"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  badgeStyle,
  badgeSizeStyle,
  badgeContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/badge.css";
import {
  backgroundStyle,
  colorStyle,
  topStyle,
  rightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.Badge,
});

/*
interface Props {
  label: string;
  hidden: boolean;
  color: ColorKeys;
  bgColor: ColorKeys;
  offset: SpacingKeys;
  size: "sm" | "md" | "lg";
}
*/

defineProps({
  label: {
    type: String,
    required: false,
  },
  hidden: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "white.800",
  },
  bgColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "red.800",
  },
  offset: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    required: false,
    default: "md",
  },
});
</script>
