<template>
  <span
    :class="[
      tagStyle,
      tagColorStyle[variant],
      fontSizeStyle[fontSize],
      fontWeightStyle[fontWeight],
    ]"
    :style="{
      width: width || 'max-content',
      borderRadius: round ? THEME.spacing.xl2 : THEME.spacing.xs2,
    }"
  >
    <WizIcon
      v-if="icon"
      :icon="icon"
      :color="tagIconColorStyle[variant]"
      :size="tagIconSize[fontSize]"
    />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import {
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  tagColorStyle,
  tagIconColorStyle,
  tagStyle,
  tagIconSize,
} from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import {
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizIcon } from "@/components/base";
import type { TIcon } from "@/components/icons";
import { TagVariant } from "./types";

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
    type: String as PropType<TagVariant>,
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
  round: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
  },
});
</script>
