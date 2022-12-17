<template>
  <div :class="iconStyle">
    <component :is="icon" :class="[fontSizeStyle[size], fillStyle[color]]" />
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { iconStyle } from "@wizleap-inc/wiz-ui-styles/bases/icon.css";
import { fillStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Icon,
});
interface Props {
  size?: FontSizeKeys;
  color?: ColorKeys;
  icon: TIcon;
}

withDefaults(defineProps<Props>(), {
  size: "xl2",
  color: "gray.700",
});
</script>
