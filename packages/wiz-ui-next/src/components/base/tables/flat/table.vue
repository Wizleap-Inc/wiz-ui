<template>
  <table
    :class="[styles.flatTableStyle, fixed && styles.flatTableFixedStyle]"
    :style="{ width }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";

defineOptions({
  name: ComponentName.FlatTable,
});

defineProps({
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
  },
});
</script>
