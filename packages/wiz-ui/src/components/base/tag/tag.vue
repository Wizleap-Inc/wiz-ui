<template>
  <span
    :class="[
      tagStyle,
      tagColorStyle[variant],
      fontSizeStyle[fontSize],
      fontWeightStyle[fontWeight],
    ]"
    :style="{ width: width || 'max-content' }"
  >
    <WizIcon v-if="icon" :icon="icon" :color="tagIconColorStyle[variant]" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import {
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  tagStyle,
  tagColorStyle,
  tagIconColorStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import {
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
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
    type: String as PropType<"info" | "error" | "success" | "warning" | "mono">,
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
