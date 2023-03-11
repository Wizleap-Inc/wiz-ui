<template>
  <table
    :class="cardTableStyle"
    :style="{
      'table-layout': fixed ? 'fixed' : 'auto',
    }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { cardTableStyle } from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTable,
});

defineProps({
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
