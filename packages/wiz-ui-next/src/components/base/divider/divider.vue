<template>
  <hr
    :class="[
      styles.dividerStyle[variant],
      styles.dividerDirectionStyle[direction],
      commonStyles.borderColorStyle[color],
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/divider.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.Divider,
});

defineProps({
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.400",
  },
  variant: {
    type: String as PropType<"solid" | "dashed" | "dotted">,
    required: false,
    default: "solid",
  },
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    required: false,
    default: "horizontal",
  },
});
</script>
