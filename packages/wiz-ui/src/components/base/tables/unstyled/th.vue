<template>
  <th
    :class="[unstyledTh, divider && unstyledThDividerYStyle]"
    :style="{ width }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  unstyledTh,
  unstyledThDividerYStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.FlatTh,
});

defineProps({
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
