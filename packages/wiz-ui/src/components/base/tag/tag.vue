<template>
  <span
    :class="[
      tagStlye,
      colorStyle[color],
      fontSizeStyle[fontSize],
      fontWeightStyle[fontWeight],
      backgroundStyle[backgroundColor],
    ]"
  >
    <WizIcon v-if="icon" :icon="icon" :color="color" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { tagStlye } from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import {
  backgroundStyle,
  colorStyle,
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
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "white.800",
  },
  backgroundColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "blue.800",
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
});
</script>
