<template>
  <th :class="unstyledTh" :style="{ width }">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTh } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.FlatTh,
});

defineProps({
  width: {
    type: String,
    required: false,
    default: "auto",
  },
});
</script>
