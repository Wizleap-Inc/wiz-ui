<template>
  <tr :class="divider && unstyledTrDividerStyle">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTrDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.UnstyledTr,
});

defineProps({
  divider: {
    type: Boolean,
    default: false,
  },
});
</script>
