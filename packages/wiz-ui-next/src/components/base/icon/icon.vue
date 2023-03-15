<template>
  <div :class="[iconStyle, iconSizeStyle[size]]">
    <component
      :is="icon"
      :class="[
        fontSizeStyle[size],
        color === 'inherit' ? iconDefaultStyle : fillStyle[color],
      ]"
    />
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
  iconSizeStyle,
  iconDefaultStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/icon.css";
import { fillStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Icon,
});

defineProps({
  icon: {
    type: Object as PropType<TIcon>,
    required: true,
  },
  color: {
    type: String as PropType<ColorKeys | "inherit">,
    required: false,
    default: "gray.700",
  },
  size: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "xl2",
  },
});
</script>
