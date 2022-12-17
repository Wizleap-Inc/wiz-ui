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

defineOptions({
  name: ComponentName.Badge,
});

interface Props {
  label?: string;
  hidden?: boolean;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  offset?: SpacingKeys;
  size?: "sm" | "md" | "lg";
}

withDefaults(defineProps<Props>(), {
  size: "md",
  color: "white.800",
  bgColor: "red.800",
  offset: "no",
});
</script>
