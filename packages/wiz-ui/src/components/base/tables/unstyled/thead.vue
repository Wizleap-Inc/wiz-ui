<template>
  <thead :class="divider && styles.unstyledTheadDividerStyle">
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

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
