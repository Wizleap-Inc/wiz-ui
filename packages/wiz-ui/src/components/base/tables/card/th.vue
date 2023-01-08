<template>
  <th :class="cardThStyle" :style="{ width }">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { cardThStyle } from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTh,
});

defineProps({
  width: {
    type: String,
    required: false,
    default: "auto",
  },
});
</script>
