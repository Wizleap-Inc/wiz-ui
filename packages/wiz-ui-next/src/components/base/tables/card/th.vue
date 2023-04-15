<template>
  <th :class="styles.cardThStyle" :style="{ width }" :colSpan="colSpan">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTh,
});

defineProps({
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  colSpan: {
    type: Number,
    required: false,
  },
});
</script>
