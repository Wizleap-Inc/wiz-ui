<template>
  <div :class="[styles.iconStyle, styles.iconSizeStyle[size]]">
    <component
      :is="icon"
      :class="[
        commonStyles.fontSizeStyle[size],
        color === 'inherit'
          ? styles.iconDefaultStyle
          : commonStyles.fillStyle[color],
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/icon.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
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
