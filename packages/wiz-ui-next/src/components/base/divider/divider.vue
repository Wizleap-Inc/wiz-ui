<template>
  <hr
    :class="[
      dividerStyle[variant],
      dividerDirectionStyle[direction],
      borderColorStyle[color],
    ]"
  />
</template>

<script setup lang="ts">
import { ComponentName, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  dividerStyle,
  dividerDirectionStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/divider.css";
import { borderColorStyle } from "@wizleap-inc/wiz-ui-styles/commons";

defineOptions({
  name: ComponentName.Divider,
});

interface Props {
  color?: ColorKeys;
  variant?: "solid" | "dashed" | "dotted";
  direction?: "horizontal" | "vertical";
}

withDefaults(defineProps<Props>(), {
  color: "gray.400",
  variant: "solid",
  direction: "horizontal",
});
</script>
