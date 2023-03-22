<template>
  <thead :class="divider && unstyledTheadDividerStyle">
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTheadDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.UnstyledThead,
});

defineProps({
  divider: {
    type: Boolean,
    default: false,
  },
});
</script>
