<template>
  <th
    :class="[styles.flatTh, styles.flatThVariantStyle[scope]]"
    :style="{ width }"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
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
});
</script>
