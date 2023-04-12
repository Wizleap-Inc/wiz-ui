<template>
  <div :class="styles.badgeContainerStyle">
    <slot />
    <div
      v-if="!hidden"
      :class="[
        styles.badgeStyle,
        label && styles.badgeSizeStyle[size],
        commonStyles.colorStyle[color],
        commonStyles.backgroundStyle[bgColor],
        commonStyles.topStyle[offset],
        commonStyles.rightStyle[offset],
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/badge.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.Badge,
});

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
