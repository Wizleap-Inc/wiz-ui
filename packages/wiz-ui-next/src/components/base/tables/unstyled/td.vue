<template>
  <td
    :class="[unstyledTdStyle, unstyledTableAlignStyle[align]]"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  unstyledTdStyle,
  unstyledTableAlignStyle,
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
  rowSpan: {
    type: Number,
    required: false,
  },
  colSpan: {
    type: Number,
    required: false,
  },
});
</script>
