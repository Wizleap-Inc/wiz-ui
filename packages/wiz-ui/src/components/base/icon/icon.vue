<template>
  <div :class="iconStyle">
    <component :is="icon" :class="[fontSizeStyle[size], fillStyle[color]]" />
    <div :class="[iconBadgeStyle, backgroundStyle[badgeBgColor]]" v-if="badge">
      <span :class="[iconBadgeTextStyle, colorStyle[badgeColor]]">{{
        badge
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  iconStyle,
  iconBadgeStyle,
  iconBadgeTextStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/icon.css";
import {
  backgroundStyle,
  colorStyle,
  fillStyle,
  fontSizeStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Icon,
});
interface Props {
  size?: FontSizeKeys;
  color?: ColorKeys;
  badge?: string;
  badgeBgColor?: ColorKeys;
  badgeColor?: ColorKeys;
  icon: TIcon;
}

withDefaults(defineProps<Props>(), {
  size: "xl2",
  color: "gray.700",
  badgeColor: "white.800",
  badgeBgColor: "red.800",
});
</script>
