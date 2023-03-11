<template>
  <table
    :class="flatTableStyle"
    :style="{
      'table-layout': fixed ? 'fixed' : 'auto',
    }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { flatTableStyle } from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";

defineOptions({
  name: ComponentName.FlatTable,
});

defineProps({
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
