<template>
  <th
    :class="[
      styles.unstyledTableAlignStyle[align],
      styles.unstyledTh,
      divider && styles.unstyledThDividerYStyle,
    ]"
    :style="{ width }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.FlatTh,
});

defineProps({
  align: {
    type: String as PropType<"left" | "center" | "right">,
    required: false,
    default: "center",
  },
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  divider: {
    type: Boolean,
    required: false,
    default: false,
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
