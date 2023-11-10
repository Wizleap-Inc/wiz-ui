<template>
  <th
    :class="[styles.flatTh, styles.flatThVariantStyle[scope]]"
    :style="{ width, fontSize: THEME.fontSize[fontSize] }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.FlatTh,
});

defineProps({
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  scope: {
    type: String as PropType<"col" | "row">,
    required: false,
    default: "col",
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
