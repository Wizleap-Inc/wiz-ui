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
import { PropType } from "vue";

defineOptions({
  name: ComponentName.Divider,
});

/*
interface Props {
  color?: ColorKeys;
  variant?: "solid" | "dashed" | "dotted";
  direction?: "horizontal" | "vertical";
}
*/

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
