<template>
  <td :class="[unstyledTdStyle, unstyledTdAlignStyle[align]]">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  unstyledTdStyle,
  unstyledTdAlignStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.UnstyledTd,
});

defineProps({
  align: {
    type: String as PropType<"left" | "center" | "right">,
    required: false,
    default: "center",
  },
});
</script>
