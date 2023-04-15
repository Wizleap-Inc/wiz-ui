<template>
  <table
    :class="[styles.cardTableStyle, fixed && styles.cardTableFixedStyle]"
    :style="{ width }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTable,
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
