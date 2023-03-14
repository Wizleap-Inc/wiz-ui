<template>
  <table :class="[cardTableStyle, fixed && cardTableFixedStyle]">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  cardTableStyle,
  cardTableFixedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

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
