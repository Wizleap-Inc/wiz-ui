<template>
  <span
    :class="[
      styles.tagStyle,
      styles.tagColorStyle[variant],
      commonStyles.fontSizeStyle[fontSize],
      commonStyles.fontWeightStyle[fontWeight],
    ]"
    :style="{ width: width || 'max-content' }"
  >
    <WizIcon
      v-if="icon"
      :icon="icon"
      :color="styles.tagIconColorStyle[variant]"
    />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import {
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizIcon } from "@/components/base";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Tag,
});

defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  variant: {
    type: String as PropType<"info" | "error" | "success" | "mono">,
    required: false,
    default: "info",
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "md",
  },
  fontWeight: {
    type: String as PropType<FontWeightKeys>,
    required: false,
    default: "normal",
  },
  width: {
    type: String,
    required: false,
  },
});
</script>
