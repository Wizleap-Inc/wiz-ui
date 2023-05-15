<template>
  <td
    :class="[flatTdStyle, flatTdAlignStyle[align]]"
    :style="{ fontSize: THEME.fontSize[fontSize] }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  flatTdStyle,
  flatTdAlignStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.FlatTd,
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
  fontSize: {
    type: String as PropType<"xs2" | "xs" | "sm" | "md">,
    required: false,
    default: "sm",
  },
});
</script>
