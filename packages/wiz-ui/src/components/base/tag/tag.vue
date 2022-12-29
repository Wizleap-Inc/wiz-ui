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

import { WizIcon } from "@/components/base";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Tag,
});

interface Props {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  backgroundColor?: ColorKeys;
  icon?: TIcon;
  label: string;
}

withDefaults(defineProps<Props>(), {
  color: "white.800",
  backgroundColor: "blue.800",
  fontSize: "md",
  fontWeight: "normal",
});
</script>
